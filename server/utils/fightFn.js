const Global = require("../global");
const Attribute = require("../table/attribute");
const Knapsack = require('../table/knapsack');
const Art = require("../table/art");
const roleFn = require("../utils/roleFn");
const taskFn = require('./taskFn');
// 战斗相关api
module.exports = {
    // 创建战斗
    creatFight: function (req, res) {
        return new Promise((resolve) => {
            const { role } = Global.getUserRole(req);
            // 获取指令池,敌人信息
            const { extDir } = Global.grandDir.dir[role.id] || { extDir: undefined };
            // 判断战斗角色池中是否已存在
            if (Global.fightLoop.fightRoleId[role.id] || !extDir) {
                resolve();
                return;
            }
            // 加入战斗角色池
            Global.fightLoop.fightRoleId[role.id] = role.id;
            // 创建战斗信息池
            if (!Global.fightLoop.fightMap[role.id]) {
                const rival = this.creatFreak(extDir);
                Global.fightLoop.fightMap[role.id] = {
                    type: 1,
                    rival,
                    player: [],
                    id: [],
                    buffs: {},
                    freak: {
                        extDir,
                        statu: 0,
                        num: rival.length
                    } // 怪物原型，战斗结束时,获取奖励等信息,或者继续
                }
            }
            this.creatPlayer(req, res).then((data) => {
                if (data) {
                    Global.fightLoop.fightMap[role.id]['player'].push(data);
                    Global.fightLoop.fightMap[role.id]['id'].push({ id: role.id, name: data.name });
                }

                resolve();
                return;
            })

        })

    },
    // 创建玩家属性
    creatPlayer: async function (req, res) {
        try {
            const results = await roleFn.getRoleInfo(req, res);
            if (results) {
                const { skill_pool } = results;
                const { fight = [null, null, null, null, null, null], art } = JSON.parse(skill_pool);
                const knapasackId = {};
                let update = false;
                fight.forEach((itme, index) => {
                    if (itme && itme.p2 == 2) {
                        knapasackId[itme.id] = {
                            id: itme.id,
                            index
                        }
                    }
                })
                // 判断战斗设置中是否有消耗物品
                if (JSON.stringify(knapasackId) !== "{}") {
                    update = true;
                    const knapasack = await roleFn.getKnapsack(req);
                    if (knapasack) {
                        const data = JSON.parse(knapasack.data);
                        const len = data.length;
                        for (let i = 0; i < len; i++) {
                            const { id, p } = data[i];
                            // Id存在战斗设置中,且为消耗品
                            if (knapasackId[id] && p == 1) {
                                fight[knapasackId[id]['index']] = {
                                    ...data[i],
                                    p2: 2
                                }
                                // 删除该项
                                delete knapasackId[id];
                            }
                            // 结束循环
                            if (JSON.stringify(knapasackId) == "{}") {
                                i = len;
                            }
                        }


                    }
                }
                // 还存在的物品为消耗殆尽
                if (JSON.stringify(knapasackId) !== "{}") {
                    Object.keys(knapasackId).forEach((key) => {
                        fight[knapasackId[key]['index']] = {
                            ...fight[knapasackId[key]['index']],
                            s: 0
                        }
                    })

                }
                // 更新角色信息
                if (update) {
                    roleFn.updateRoleInfo(req, {
                        skill_pool: JSON.stringify({
                            fight,
                            art
                        })
                    })
                }
                // 计算角色属性
                const data = roleFn.computeRoleAttr(req, res, results);
                if (!data) {
                    return;
                }
                const { role } = Global.getUserRole(req);
                return {
                    id: role.id,
                    attr: {
                        ...data.attr,
                        life: results['life'] > data.attr.life_max ? data.attr.life_max : results['life'],
                        mana: results['mana'] > data.attr.mana_max ? data.attr.mana_max : results['mana'],
                    },
                    art: fight,
                    name: results.role_name
                }
            }

        } catch (error) {
            console.log(error)
            return;
        }


    },
    // 创建怪物
    creatFreak: function (freak) {
        const { name, ext } = freak;
        const { career, level, attr, boss } = ext;
        const { freakAttr } = Attribute;
        let type = 'balanced';

        if (career === 1) {
            type = 'atk';
        }
        if (career === 2) {
            type = 'dfs';
        }
        if (career === 3) {
            type = 'agile';
        }
        const attrs = { ...freakAttr[type] };
        const addition = level * attr;
        Object.keys(attrs).forEach((key) => {
            if (key == 'life' || key == 'mana') {
                attrs[key] *= addition * (boss ? 100 : 1);
                attrs[`${key}_max`] = attrs[key];
                return;
            }
            attrs[key] *= addition;
        });
        // boss只有一个,非boss存在多个
        let num = Math.floor(Math.random() * ((boss ? 1 : 5) - 1)) + 1;
        if (level < 20) {
            num = 1;
        }
        const rival = [];
        for (num; 0 < num; num--) {
            rival.push({
                attr: { ...attrs },
                name
            })
        }
        return rival;

    },
    // 生成属性
    creatAttr: function (attr) {
        function random(max, min) {
            if (max && min) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }
            return 0;
        }
        return {
            atk: random(attr['atk_max'], attr['atk_min']),
            dfs: random(attr['dfs_max'], attr['dfs_min']),
            ice_atk: random(attr['ice_atk_max'], attr['ice_atk_min']),
            ice_dfs: random(attr['ice_dfs_max'], attr['ice_dfs_min']),
            mine_atk: random(attr['mine_atk_max'], attr['mine_atk_min']),
            mine_dfs: random(attr['mine_dfs_max'], attr['mine_dfs_min']),
            wind_atk: random(attr['wind_atk_max'], attr['wind_atk_min']),
            wind_dfs: random(attr['wind_dfs_max'], attr['wind_dfs_min']),
            water_atk: random(attr['water_atk_max'], attr['water_atk_min']),
            water_dfs: random(attr['water_dfs_max'], attr['water_dfs_min']),
            fire_atk: random(attr['fire_atk_max'], attr['fire_atk_min']),
            fire_dfs: random(attr['fire_dfs_max'], attr['fire_dfs_min']),
            hit: attr.hit,
            dodge: attr.dodge,
            sudden: attr.sudden,
        }
    },
    // 计算生命
    computeLife: function (dps, tag) {
        const { attr } = tag;
        const { life } = attr;
        if (life - dps <= 0) {
            attr.life = 0;
            return true;
        }
        attr.life -= dps
    },
    // buff解析
    computeBuff: function (player, in_x, dirIndex, buffs) {
        const { art, attr, name } = player[in_x];
        const { id, d, v } = art[dirIndex];
        // 已存在属性属性buff,或者法力不足
        if (buffs[id] || attr.mana - d < 0) {
            return;
        }

        attr.mana -= d;
        let buffTip = `【${name}(${Art.art[id]['n']})】：`;
        Object.keys(v).forEach(key => {
            const val = v[key];
            buffTip += `${Attribute.MEUN[key]}上限+${val},`
            if (key === 'life' || key === 'mana') {
                player.forEach((itme) => {
                    itme.attr[`${key}_max`] += val;
                    itme.attr[key] += val;
                })
                return;
            }
            if (key === 'hit' || key === 'dodge' || key === "sudden") {
                player.forEach((itme) => {
                    itme.attr[key] += val;
                })
                return;
            }
            player.forEach((itme) => {
                itme.attr[`${key}_max`] += val;
                itme.attr[`${key}_min`] += val;
            })

        })
        buffs[id] = buffTip.slice(0, -1);
    },
    // 使用物品
    drugDir: function (player, in_x, dirIndex) {
        const { art, attr } = player[in_x];
        const { id } = art[dirIndex];
        art[dirIndex].num = art[dirIndex].num ? art[dirIndex].num + 1 : 1;
        art[dirIndex].s -= 1;
        const effect = Knapsack[id]['effect'];
        Object.keys(effect).forEach(key => {
            attr[key] += effect[key];
            // 恢复生命不可超过最大生命
            if (attr[key] > attr[`${key}_max`]) {
                attr[key] = attr[`${key}_max`]
            }
        });
    },
    // 计算伤害
    computeDps: function (attr1, attr2, info, rise = 100) {
        const { atk, ice_atk = 0, mine_atk = 0, wind_atk = 0, water_atk = 0, fire_atk = 0, hit, sudden: sudden1 } = attr1;
        const { dfs, ice_dfs = 0, mine_dfs = 0, wind_dfs = 0, water_dfs = 0, fire_dfs = 0, dodge, sudden: sudden2 } = attr2;
        let isHit = hit >= dodge;
        // 闪避计算
        if (!isHit) {
            // 每多出100点 + 1%概率 闪避超过命中默认10闪避
            const rate = (dodge - hit) / 100 + 10;
            // 随机1-100的值，如果大于闪避值则命中
            isHit = Math.floor(Math.random() * (100 - 1)) + 1 > rate;
        }
        if (isHit) {
            let dps = (atk - dfs) * (rise / 100);
            let rate = 10;
            let sudden = 100;
            dps += ice_atk - ice_dfs;
            dps += mine_atk - mine_dfs;
            dps += wind_atk - wind_dfs;
            dps += water_atk - water_dfs;
            dps += fire_atk - fire_dfs;
            if (sudden1 < 3000) {
                rate += sudden1 / 150;
            } else if (sudden1 < 10000) {
                rate += (sudden1 - 3000) / 350 + 15;
            } else if (sudden1 < 50000) {
                rate += (sudden1 - 10000) / 1300 + 45
            } else {
                rate += (sudden1 - 50000) / 5000 + 75
            }
            const isSudden = Math.floor(Math.random() * (100 - 1)) + 1 < rate;
            // 暴击
            if (isSudden) {
                sudden = 200;
                const diff = (sudden1 - sudden2) / 500;
                if (diff > 100) {
                    sudden += 100
                } else if (diff < -50) {
                    sudden -= 50
                } else {
                    sudden += diff;
                }
            }
            dps = parseInt(dps * sudden / 100);
            if (dps <= 0) {
                return {
                    dps: 0,
                    text: `${info.name}使用${info.artName},未能对${info.tagName}造成伤害。`
                }
            }
            return {
                dps,
                text: ''
            }
        }
        return {
            dps: 0,
            text: `${info.name}使用${info.artName},${info.tagName}施展出诡异身法避开了。`
        }
    },
    // 普通攻击
    normalDir: function (player, in_x, rival, playerAttr, rivalAttr, fightRes) {
        const dpsList = [];
        const { name } = player[in_x];
        const info = {
            name,
            artName: '普通攻击',
            tagName: rival[0].name
        }
        // 计算玩家对怪物的伤害
        const playerDps = this.computeDps(playerAttr, rivalAttr, info);
        rival[0]['attr']['life'] -= playerDps.dps;
        // 判断怪物是否死亡，死亡则不记录伤害
        if (rival[0]['attr']['life'] > 0) {
            dpsList.push(playerDps.dps);
        }
        // 将死亡怪物清除
        rival = rival.filter(({ attr }) => attr.life > 0);
        fightRes['player'] = {
            text: playerDps.text,
            dpslist: [...dpsList],
        }
        return rival.length === 0 ? 1 : 0
    },
    // 技能攻击
    atkDir: function (player, in_x, dirIndex, rival, playerAttr, rivalAttr, fightRes) {
        const dpsList = [];
        const { art, attr, name } = player[in_x];
        const { t, d, n, v } = art[dirIndex];
        const mana = attr.mana - d;
        let artV = 100;
        if (mana >= 0) {
            artV = v;
            attr.mana = mana;
        }
        const info = {
            name,
            artName: n,
            tagName: rival[0].name
        }
        // 计算玩家对怪物的伤害
        const playerDps = this.computeDps(playerAttr, rivalAttr, info, artV);
        for (let i = 0; i < t && rival[i]; i++) {
            const life = rival[i]['attr']['life'] - playerDps.dps;
            rival[i]['attr']['life'] = life;
            // 判断怪物是否死亡，死亡则不记录伤害
            if (life > 0) {
                dpsList.push(playerDps.dps);
            }
        }
        // 将死亡怪物清除
        rival = rival.filter(({ attr }) => attr.life > 0);
        fightRes['player'] = {
            text: playerDps.text,
            dpslist: [...dpsList],
        }
        return rival.length === 0 ? 1 : 0
    },
    // 怪物伤害
    rivalDir: function (player, in_x, rival, playerAttr, rivalAttr, fightRes) {
        const { attr, name } = player[in_x];
        const dpsList = [];
        const num = rival.length > player.length ? rival.length - player.length + 1 : 1;
        const info = {
            name: rival[0].name,
            artName: '普通攻击',
            tagName: name
        }
        const rivalDps = this.computeDps(rivalAttr, playerAttr, info);
        // 最多被三个怪攻击
        const dps = num > 3 ? rivalDps.dps * 3 : rivalDps.dps * num;
        attr.life -= dps;
        if (attr.life <= 0) {
            attr.life = 0;
        };
        fightRes['rival'] = {
            text: rivalDps.text,
            dpslist: [dps]
        }
        return attr.life === 0 ? -1 : 0;
    },
    // 释放战斗
    releaseFight: async function (req, res, fightId) {
        const { role: role_g } = Global.getUserRole(req);
        let { player, id: ids } = Global.fightLoop.fightMap[fightId];
        const { art, attr } = player.find(({ id }) => id === role_g.id);
        const role = await roleFn.getRoleInfo(req, res);
        if (role) {
            //    更新角色当前生命
            roleFn.updateRoleInfo(req, {
                life: attr.life,
                mana: attr.mana
            })
        }
        const drug = {};
        // 找到使用过的消耗品
        art.forEach((itme) => {
            if (itme && itme.num) {
                drug[itme.id] = {
                    num: itme.num,
                    p: itme.p
                }
            }
        })
        if (JSON.stringify(drug) !== "{}") {
            const knapasack = await roleFn.getKnapsack(req);
            const data = JSON.parse(knapasack.data);
            for (let i = 0; i < Knapsack.size; i++) {
                const { id, p } = data[i];
                // 找到使用过的消耗品
                if (drug[id] && p === drug[id]['p']) {
                    // 减去对应丹药
                    data[i].s -= drug[id]['num'];
                    delete drug[id];
                }
                // 结束循环
                if (JSON.stringify(drug) === "{}") {
                    i = Knapsack.size;
                }
            }
            // 更新背包
            await roleFn.updateKnapsack(req, { data: JSON.stringify(data) });
        }
        // 释放战斗池id
        delete Global.fightLoop.fightRoleId[role_g.id];
        //  释放战斗信息池
        // 判断是否为本次战斗中最后一个玩家,否则移除自己即可
        if (player.lenght !== 1) {
            delete Global.fightLoop.fightMap[fightId]
        } else {
            Global.fightLoop.fightMap[fightId]['player'] = player.filter(({ id }) => id !== role_g.id);
            Global.fightLoop.fightMap[fightId]['id'] = ids.filter(({ id }) => id !== role_g.id);
        }
    },
    // 结算战斗奖励
    getFightReward: async function (req, res, freak) {
        const { name, article = [], ext } = freak.extDir;
        const textReward = [];
        const artReward = {}; // 物品奖励
        const equipReward = {}; // 装备奖励
        const rateS = Math.floor(Math.random() * (100 - 0)) + 0;
        article.forEach((itme) => {
            if (!itme.rate || itme.rate > rateS) {
                // 根据类型保存
                itme.type == 3 ? equipReward[itme.id] = itme : artReward[itme.id] = itme;
            }
        });
        const knapsack = await roleFn.getKnapsack(req);
        const data = JSON.parse(knapsack.data);
        // 背包最大200条数据
        if (JSON.stringify(artReward) !== '{}' && !data[Knapsack.size]) {
            // 查找物品是否存在背包内
            for (let index = 0; index < Knapsack.size; index++) {
                if (!data[index]) {
                    index = Knapsack.size;
                    continue;
                }
                const { p, id, s } = data[index];
                // 判断物品id与物品类型是否相同
                if (artReward[id] && artReward[id].type == p) {
                    const { num = 1, n } = artReward[id];
                    // 找到对应id,判断是否可以继续叠加
                    if (s + num <= Knapsack.Maxs) {
                        data[index]['s'] += num;
                        textReward.push(`${n}x${num}`)
                        delete artReward[id];
                    } else {
                        artReward[id]['num2'] = data[index]['s'] + num - Knapsack.Maxs;
                        data[index]['s'] = Knapsack.Maxs;
                    }
                }
                // 全部处理完,结束循环
                if (JSON.stringify(artReward) === '{}') {
                    index = Knapsack.size;
                }
            }

            //  遍历结束还存在物品奖励，说明物品为新增
            Object.keys(artReward).forEach(key => {
                if (!data[Knapsack.size]) {
                    const { id, type, n, num = 1, num2 } = artReward[key];
                    data.push({ id, n, p: type, s: num2 || num });
                    textReward.push(`${n}x${num}`);
                    delete artReward[key];
                }
            })
        }

        if (!data[Knapsack.size]) {
            Object.keys(equipReward).forEach(key => {
                if (!data[Knapsack.size]) {
                    const { id, type, name, num = 1 } = equipReward[key];
                    data.push({ id, n: name, p: type, s: num, ext: '0_0_0_0_0_0_0' });
                    textReward.push(`${name}x${num}`);
                    delete equipReward[key];
                }
            })
        }
        // 获取人物buff
        const role = await roleFn.getRoleInfo(req, res);
        const buffPool = JSON.parse(role.buff_pool)
        const { vip = {} } = buffPool;
        let vipExp = 0;
        if (vip['exp2']) {
            vipExp += 2
        }
        if (vip['exp3']) {
            vipExp += 3
        }
        if (vip['exp5']) {
            vipExp += 5
        }
        let vipTael = 0;
        if (vip['money2']) {
            vipTael += 2
        }
        if (vip['money3']) {
            vipTael += 3
        }
        if (vip['money5']) {
            vipTael += 5
        }
        // 物品可叠加
        const { level, arrt, boss, exps = 0, taels = 0 } = ext;
        // 经验
        const exp = (exps || level * (parseInt(arrt / 10) || 1) * (boss ? 1000 : 1)) * (vipExp || 1);
        // 银两
        const tael = (taels || exp < 100 ? exp : exp / 100) * (vipTael || 1);
        // 更新背包
        roleFn.updateKnapsack(req, { data: JSON.stringify(data), tael: knapsack.tael - 0 + tael * freak.num });
        // 更新角色经验等级
        roleFn.computeRoleLevel(req, res, exp * freak.num);
        // 监听任务池
       const tasks = taskFn.listenTask(req, freak.extDir['id'], freak.num);
        res.send({
            code: 0,
            data: {
                statu: 1,
                freak: {
                    name,
                    exp: vipExp ? `${exp * freak.num}(${vipExp}倍经验)` : exp * freak.num,
                    tael: vipTael ? `${tael * freak.num}(${vipTael}倍银两)` : tael * freak.num,
                    article: textReward.join(','),
                    tip: JSON.stringify(artReward) !== '{}' || JSON.stringify(equipReward) !== '{}' ? '背包已满,请注意清理。' : ''
                },
                tasks
            }
        });

    },


};
