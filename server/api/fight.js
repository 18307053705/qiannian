const express = require("express");
const fightFn = require("../utils/fightFn");
const Knapsack = require('../table/knapsack');
const Global = require("../global");
const { error, ERR_MEUN } = require("../utils/errorFn");
const router = new express.Router();

router.post("/getFightInfo", (req, res) => {
    const { role_id } = Global.getRoleGlobal(req);
    const { player, ...data } = Global.getFight(req);
    const role = [];
    const players = [];
    let arts = undefined;
    player.forEach(({ id, attr, art, name }) => {
        if (id === role_id) {
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
    const { data } = Global.getknapsackGlobal(req);
    const { skill_pool } = Global.getRoleGlobal(req);
    const drug = [];
    const art = [];
    data.forEach(({ n, id, p }) => {
        if (p === 1) {
            drug.push({ name: n, id, })
        }
    })
    skill_pool.art && skill_pool.art.forEach(({ n, id, p }) => {
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
});
// 设置战斗键
router.post("/setFightDir", async (req, res) => {
    const { dir, type, index } = req.body;
    const { role_id, skill_pool } = Global.getRoleGlobal(req);
    const { data } = Global.getknapsackGlobal(req);
    const { art, fight } = skill_pool;
    // 默认为技能列表
    let list = art;
    // 若更改类型为消耗品，则获取背包物品,并更新消耗物品
    if (type == 2) {
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
            Global.updateknapsackGlobal(req, { data });
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
        const { player } = Global.getFight(req);
        player.forEach((itme) => {
            if (itme.id === role_id) {
                itme.art = fight
            }
        })
        const result = Global.updateRoleGlobal(req, { skill_pool });
        Global.updataFight(req, { player })
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
    const { role_id } = Global.getRoleGlobal(req);
    let { player, rival, buffs, freak } = Global.getFight(req);

    if (freak.statu === 1) {
        fightFn.releaseFight(req, res);
        fightFn.getFightReward(req, res, freak);
        return;
    }
    const in_x = player.findIndex(({ id }) => id == role_id);
    if (in_x === -1) {
        error(res, ERR_MEUN.ROLE)
        return;
    }
    const { art, attr } = player[in_x];
    const { p2 = 0, s, p } = art[index] || {};
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
    Global.updataFight(req, { player, buffs, rival: rival.filter(({ attr }) => attr.life > 0) });
    // 战斗结束
    if (fightRes.statu !== 0) {
        // 释放战斗池,更新背包
        fightFn.releaseFight(req, res)
    }

    // 战胜
    if (fightRes.statu === 1) {
        // 更新我状态
        freak.statu = fightRes.statu;
        if (Global.getFight(req)) {
            Global.updataFight(req, { freak })
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
    fightFn.creatFight(req, res);
    res.send({
        code: 0,
        data: {
            path: '/fight'
        }
    });
});
// 放弃战斗
router.post("/give", (req, res) => {
    fightFn.releaseFight(req, res);
    res.send({
        code: 0,
        data: ''
    });
});


module.exports = router;
