const express = require("express");
const fightFn = require("../utils/fightFn");
const roleFn = require("../utils/roleFn");
const Knapsack = require('../table/knapsack');
const Global = require("../global");
const { error, ERR_MEUN } = require("../utils/errorFn");
const router = new express.Router();

router.post("/getFightInfo", (req, res) => {
    const { role: role_g } = Global.getUserRole(req);
    // 获取战斗池id
    const fightId = Global.fightLoop.fightRoleId[role_g.id];
    const { player, ...data } = Global.fightLoop.fightMap[fightId];

    const role = [];
    const players = [];
    let arts = undefined;
    player.forEach(({ id, attr, art, name }) => {
        if (id === role_g.id) {
            role.push({
                name,
                attr
            })
            arts = art.map((itme) => (itme ? { id: itme.id, name: itme.n, s: itme.s } : { id: 0, name: '普通攻击' }));
            return;
        }
        players.push({ name, attr });
    })
    res.send({
        code: 0,
        data: {
            rival: data.rival,
            player: [...role, ...players],
            art: arts,
            list: data.id,
            buffs: data.buffs,
        }
    });
});

// 战斗键列表
router.post("/getFightDir", async (req, res) => {
    const kanp = await roleFn.getKnapsack(req, res);
    const role = await roleFn.getRoleInfo(req, res);
    if (kanp && role) {
        const data = kanp.data ? JSON.parse(kanp.data) : [];
        const skill = role.skill_pool ? JSON.parse(role.skill_pool) : { art: [] };
        const drug = [];
        const art = [];
        data.forEach(({ n, id, p }) => {
            if (p === 1) {
                drug.push({ name: n, id, })
            }
        })
        skill.art && skill.art.forEach(({ n, id, p }) => {
            if (p !== 3) {
                art.push({ name: n, id, })
            }
        })
        res.send({
            code: 0,
            data: {
                drug,
                art
            }
        })
    }
});
// 设置战斗键
router.post("/setFightDir", async (req, res) => {
    const { dir, type, index } = req.body;
    const { role: role_g } = Global.getUserRole(req);
    const fightId = Global.fightLoop.fightRoleId[role_g.id];
    const role = await roleFn.getRoleInfo(req, res);
    const { art, fight } = JSON.parse(role.skill_pool);
    // 默认为技能列表
    let list = art;
    // 若更改类型为消耗品，则获取背包物品,并更新消耗物品
    if (type == 2) {
        const kanp = await roleFn.getKnapsack(req);
        const data = JSON.parse(kanp.data);
        // 获取替换前的物品信息
        const { num, id } = fight[index] = {};
        // 消耗过该物品，则进行背包更新
        if (num) {
            for (let i = 0; i < Knapsack.size; i++) {
                if (data[i].id === id && data[i].p === 1) {
                    // 减去对应数量
                    data[i].s -= num;
                    // 结束循环
                    i = Knapsack.size;
                }
            }
            // 更新物品
            roleFn.updateKnapsack(req, { data: JSON.stringify(data) });
        }
        list = data
    }
    // 
    const itme = list.find(({ id, p }) => dir == id && p == 1);
    // 设置技能键未更改情况,不做处理返回之前战斗设置
    if (itme && fight[index].id !== dir) {
        fight[index] = {
            ...itme,
            p2: type,
        };
        const { player } = Global.fightLoop.fightMap[fightId];
        player.forEach((itme) => {
            if (itme.id === role_g.id) {
                itme.art = fight
            }
        })
        const result = await roleFn.updateRoleInfo(req, {
            skill_pool: JSON.stringify({ art, fight })
        })
        if (result) {
            Global.fightLoop.fightMap[fightId]['player'] = player
        }
        res.send({
            code: result ? 0 : 100003,
            data: result ? fight.map((itme) => (itme ? { id: itme.id, name: itme.n, s: itme.s } : { id: 0, name: '普通攻击' })) : '更新失败'
        })
        return;
    }
    res.send({
        code: 0,
        data: fight.map((itme) => (itme ? { id: itme.id, name: itme.n } : { id: 0, name: '普通攻击' })),
    })
});


// 战斗指令处理
router.post("/fightDir", async (req, res) => {
    const { index } = req.body;
    if (index > 5) {
        error(res, ERR_MEUN.DIR);
        return;
    }
    const { role } = Global.getUserRole(req);
    // 获取战斗池id
    const fightId = Global.fightLoop.fightRoleId[role.id];
    let { player, rival, buffs, freak } = Global.fightLoop.fightMap[fightId];
    if (freak.statu === 1) {
        fightFn.releaseFight(req, res, fightId)
        fightFn.getFightReward(req, res, freak);
        return;
    }
    const in_x = player.findIndex(({ id }) => id == role.id);
    if (in_x === -1) {
        error(res, ERR_MEUN.ROLE)
        return;
    }
    const { art, attr } = player[in_x];
    const { p2 = 0, s, p } =  art[index] || {};
    // 我方属性
    const playerAttr = fightFn.creatAttr(attr);
    // 敌方属性
    const rivalAttr = fightFn.creatAttr(rival[0].attr);
    const fightRes = {
        player: {
            text: '',
            dpslist: []
        },
        rival: {
            text: '',
            dpslist: []
        },
        statu: 0
    }

    // 使用药品
    if (p2 === 2 && s > 0) {
        fightFn.drugDir(player, in_x, index);
    }
    // 使用伤害技能: 技能类型:p(1伤害,2buff) 消耗:d 伤害:v 目标数量:t 
    if (p2 === 1 && p === 1) {
        fightRes.statu = fightFn.atkDir(player, in_x, index, rival, playerAttr, rivalAttr, fightRes);
    }
    // 使用buffs技能: 技能类型:p(1伤害,2buff) 消耗:d buff值:v 目标回合:t buff属性：attr
    if (p2 === 1 && p === 2) {
        fightFn.computeBuff(player, in_x, index, buffs);
    }
    // 普通攻击
    if (p2 === 0) {
        fightRes.statu = fightFn.normalDir(player, in_x, rival, playerAttr, rivalAttr, fightRes);
    }
    // 判断战斗是否结束
    fightRes.statu = fightRes.statu || fightFn.rivalDir(player, in_x, rival, playerAttr, rivalAttr, fightRes);

    player[in_x] = {
        ...player[in_x],
        art,
        attr
    }
    // 指令结束,更新战斗池
    Global.fightLoop.fightMap[fightId]['player'] = player;
    Global.fightLoop.fightMap[fightId]['buffs'] = buffs;
    Global.fightLoop.fightMap[fightId]['rival'] = rival.filter(({ attr }) => attr.life > 0);
    // 战斗结束
    if (fightRes.statu !== 0) {
        // 释放战斗池,更新背包
        fightFn.releaseFight(req, res, fightId)
    }

    // 战胜
    if (fightRes.statu === 1) {
        // 更新我状态
        freak.statu = fightRes.statu;
        if (Global.fightLoop.fightMap[fightId]) {
            Global.fightLoop.fightMap[fightId]['freak'] = freak;
        }
        fightFn.getFightReward(req, res, freak);
        return;
    }

    if (fightRes.statu === -1) {
        res.send({
            code: 0,
            data: {
                statu: -1,
                freak,
            }
        });
        return;
    }



    res.send({
        code: 0,
        data: fightRes
    })
    return;
});

router.post("/clean", (req, res) => {
    Global.grandDir.set(req, { extDir: undefined });
    res.send({
        code: 0,
        data: ''
    });
});
// 刷怪
router.post("/continue", (req, res) => {
    fightFn.creatFight(req, res).then(() => {
        res.send({
            code: 0,
            data: {
                path: '/fight'
            }
        });
    })
});
// 放弃战斗
router.post("/give", (req, res) => {
    Global.grandDir.set(req, { extDir: undefined });
    const { role } = Global.getUserRole(req);
    // 获取战斗池id
    const fightId = Global.fightLoop.fightRoleId[role.id];
    fightFn.releaseFight(req, res, fightId);
    res.send({
        code: 0,
        data: ''
    });
});


module.exports = router;
