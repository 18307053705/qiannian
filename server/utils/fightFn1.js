const Global = require("../global/index2");
const Attribute = require("../table/attribute");
const Knapsack = require('../table/knapsack1');
const Art = require("../table/art");
const roleFn = require("./roleFn");
const knapsackFn = require("./knapsackFn1");
const taskFn = require('./taskFn');
const artFn = require('./artFn1');
const petFn = require('./petFn');
// 战斗相关api
module.exports = {
    // 创建战斗
    creatFight: function (req, res) {
        const { role_id, role_name } = Global.getRoleGlobal(req);
        const fightInfo = Global.getFight(req);
        // 获取指令池,敌人信息
        const { extDir } = Global.getDir(req);
        if (fightInfo || !extDir) {
            return undefined;
        }
        // 加入战斗角色池
        Global.fightRoleId[role_id] = role_id;
        // 创建怪物
        const rival = this.creatFreak(extDir);
        const { ext } = extDir;
        const fight = {
            type: 1,
            rival,
            player: [],
            id: [],
            // buffs: {},
            freak: {
                extDir,
                statu: 0,
                num: rival.length,
                continue: !ext.boss

            } // 怪物原型，战斗结束时,获取奖励等信息,或者继续
        }
        const player = this.creatPlayer(req);
        fight['player'].push(player);
        fight['id'].push({ id: role_id, name: role_name });
        Global.setFight(req, fight);
    },
    // 创建玩家属性
    creatPlayer: function (req, res) {
        const roleInfo = Global.getRoleGlobal(req);
        const knapasack = Global.getknapsackGlobal(req);
        const pet = Global.getPetGlobal(req);
        const { fight = [null, null, null, null, null, null], art } = roleInfo.skill_pool;
        const knapasackId = {};
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
            const { data } = knapasack;
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

            // 还存在的物品,为消耗殆尽
            if (JSON.stringify(knapasackId) !== "{}") {
                Object.keys(knapasackId).forEach((key) => {
                    fight[knapasackId[key]['index']] = {
                        ...fight[knapasackId[key]['index']],
                        s: 0
                    }
                })

            }
        }
        // 更新战斗信息
        Global.updateRoleGlobal(req, { skill_pool: roleInfo.skill_pool });
        // 计算角色属性
        const data = roleFn.computeRoleAttr(req, roleInfo);
        // 获取宠物信息
        const petInfo = {
            name: pet.name,
            attr: petFn.computeAttr(pet),
            art: pet['art'][0]
        }
        return {
            id: roleInfo.role_id,
            attr: {
                ...data.attr,
                life: roleInfo['life'] > data.attr.life_max ? data.attr.life_max : roleInfo['life'],
                mana: roleInfo['mana'] > data.attr.mana_max ? data.attr.mana_max : roleInfo['mana'],
            },
            art: fight,
            name: roleInfo.role_name,
            pet: petInfo,
            buffs: {} // {role_id:{value:life:5000,atk:500,t:5,text:描述}}
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
    // buff计算
    computeBuffs: function (player, in_x, fightRound) {
        const { buffs } = player[in_x];
        // buffs: {} // {role_id:{value:life:5000,atk:500,t:5,text:描述}}
        const role_ids = [];
        const bufftext = [];
        Object.keys(buffs).forEach((role_id) => {
            const { value, t, text } = buffs[role_id];
            if (t === 1) {
                role_ids.push(role_id);
                Object.keys(value).forEach((key) => {
                    if (key === 'life' || key === 'mana') {
                        player.forEach((itme) => {
                            itme.attr[`${key}_max`] -= value[key];
                        })
                        return;
                    }
                    if (key === 'hit' || key === 'dodge' || key === "sudden") {
                        player.forEach((itme) => {
                            itme.attr[key] -= value[key];
                        })
                        return;
                    }
                    player.forEach((itme) => {
                        itme.attr[`${key}_max`] -= value[key];
                        itme.attr[`${key}_min`] -= value[key];
                    })

                })
                return;
            }
            bufftext.push(`${text},持续${t - 1}回合。`)
            buffs[role_id]['t'] = t - 1;
        })
        role_ids.forEach((role_id) => {
            delete buffs[role_id]
        })
        fightRound['buffText'] = bufftext;
    },
    // 使用物品
    drugDir: function (player, in_x, dirIndex) {
        const { art, attr } = player[in_x];
        const { id } = art[dirIndex];
        art[dirIndex].num = art[dirIndex].num ? art[dirIndex].num + 1 : 1;
        art[dirIndex].s -= 1;
        const { group1 } = Knapsack[id];
        const [key, value] = group1.split('-');
        attr[key] += value;
        if (attr[key] > attr[`${key}_max`]) {
            attr[key] = attr[`${key}_max`]
        }
    },
    // 计算伤害
    computeDps: function (attr1, attr2, rise = 100) {
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
        let dps = 0;
        if (isHit) {
            dps = (atk - dfs) * (rise / 100);
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
        }
        return {
            dps: dps < 0 ? 0 : dps,
            isHit
        }
    },
    // 普通攻击
    normalDir: function (rival, playerAttr, rivalAttr, fightRound) {
        // 计算玩家对怪物的伤害
        let { isHit, dps } = this.computeDps(playerAttr, rivalAttr);
        if (isHit && dps > 0) {
            rival[0]['attr']['life'] -= dps;
            // 判断怪物是否死亡，死亡则不记录伤害
            if (rival[0]['attr']['life'] > 0) {
                fightRound['dps'] = [-dps]
            }
            // 将死亡怪物清除
            rival = rival.filter(({ attr }) => attr.life > 0);
        }
        return rival;
    },
    // 技能攻击
    artDir: function (art, player, playerAttr, rival, rivalAttr, fightRound) {
        const { v, e, t = 1, n } = art;
        if (e && e['ignore']) {
            // 无视防御
            rivalAttr['dfs'] = rivalAttr['dfs'] * (100 - e['ignore']) / 100;
        }
        let { isHit, dps } = this.computeDps(playerAttr, rivalAttr, v);
        if (e && e['atk']) {
            // 增伤
            dps = parseInt(dps * (100 + e['atk']) / 100);
        }
        if (e && e['suck']) {
            // 吸血
            let life = parseInt(dps * e['suck'] / 100);
            player['attr']['life'] += life;
            fightRound['life'] = life
        }
        const dpsText = [];
        // 命中且造成伤害
        if (isHit && dps > 0) {
            for (let i = 0; i < t && rival[i]; i++) {
                const life = rival[i]['attr']['life'] - dps;
                rival[i]['attr']['life'] = life;
                // 判断怪物是否死亡，死亡则不记录伤害
                if (life > 0) {
                    dpsText.push(-dps);
                }
            }
        }
        // 将死亡怪物清除
        rival = rival.filter(({ attr }) => attr.life > 0);
        fightRound['dps'] = dpsText;
        return rival;
    },
    petDir: function (pet, rival, rivalAttr, fightRound) {
        const attr = this.creatAttr(pet.attr);
        const { v, effect } = pet.art;
        const [e, ev] = effect.split('-');
        if (e === 'ignore') {
            // 无视防御
            rivalAttr['dfs'] = rivalAttr['dfs'] * (100 - ev) / 100;
        }
        let { isHit, dps } = this.computeDps(attr, rivalAttr, v);
        if (e === 'atk') {
            // 增伤
            dps = parseInt(dps * (100 + ev) / 100);
        }
        if (e === 'life') {
            dps += (pet.attr.life_max * ev) / 100;
        }
        if (isHit && dps > 0) {
            rival[0]['attr']['life'] -= dps;
            // 判断怪物是否死亡，死亡则不记录伤害
            if (rival[0]['attr']['life'] > 0) {
                fightRound['dps'][0] = fightRound['dps'][0] ? fightRound['dps'][0] - dps : -dps
            }
        }
        // 将死亡怪物清除
        rival = rival.filter(({ attr }) => attr.life > 0);
        return rival;
    },
    // 怪物伤害
    rivalDir: function (player, in_x, rival, playerAttr, rivalAttr, fightRound) {
        const { attr } = player[in_x];
        const num = rival.length > player.length ? rival.length - player.length + 1 : 1;
        let { isHit, dps } = this.computeDps(rivalAttr, playerAttr);
        // 最多被三个怪攻击
        dps = num > 3 ? dps * 3 : dps * num;
        attr.life -= dps;
        if (attr.life <= 0) {
            attr.life = 0;
        };
        fightRound['life'] += -dps;
        return attr.life === 0 ? -1 : 0;
    },
    // 释放战斗
    releaseFight: async function (req, res) {
        const { role_id } = Global.getRoleGlobal(req);
        const { data } = Global.getknapsackGlobal(req);
        const fightId = Global.fightRoleId[role_id];
        const fightInfo = Global.getFight(req);
        if (fightInfo) {
            let { player, id: ids } = fightInfo;
            const { art, attr } = player.find(({ id }) => id === role_id);
            Global.updateRoleGlobal(req, {
                life: attr.life,
                mana: attr.mana
            })
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
                Global.updateknapsackGlobal(req, { data })
            }
            // 释放战斗池id
            delete Global.fightRoleId[role_id];
            //  释放战斗信息池
            // 判断是否为本次战斗中最后一个玩家,否则移除自己即可
            if (player.lenght === 1) {
                delete Global.fightMap[fightId]
            } else {
                Global.fightMap[fightId]['player'] = player.filter(({ id }) => id !== role_id);
                Global.fightMap[fightId]['id'] = ids.filter(({ id }) => id !== role_id);
            }
        }
        return;
    },
    // 结算战斗奖励
    getFightReward: async function (req, res, freak) {
        const roleInfo = Global.getRoleGlobal(req);
        const knapsack = Global.getknapsackGlobal(req);
        const { name, article = [], ext } = freak.extDir;
        const textReward = [];
        const artReward = {}; // 物品奖励
        const equipReward = {}; // 装备奖励
        const rateS = Math.floor(Math.random() * (100 - 0)) + 0;
        article.forEach((itme) => {
            if (!itme.rate || itme.rate > rateS) {
                // 根据类型保存
                itme.type == 3 ? equipReward[itme.id] = { ...itme, ext: '0_0_0_0_0_0_0_0' } : artReward[itme.id] = itme;
                textReward.push(`${itme.name || itme.n}+${itme.s || itme.num || 1}`)
            }
        });
        const tip = knapsackFn.addKnapsack({ artReward, equipReward }, knapsack.data);
        // 获取人物buff
        const { role_buff } = roleInfo;
        const { vip = {} } = role_buff;
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
        Global.updateknapsackGlobal(req, { data: knapsack.data, tael: knapsack.tael - 0 + tael * freak.num });
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
                    article: tip ? '' : textReward.join(','),
                    tip,
                    continue: freak.continue
                },
                tasks
            }
        });

    },
};
