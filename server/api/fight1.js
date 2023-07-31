const express = require("express");
const fightFn = require("../utils/fightFn");
const artFn = require("../utils/artFn");
const Knapsack = require('../table/knapsack');
const Global = require("../global/index2");
const { error, ERR_MEUN } = require("../utils/errorFn");
const router = new express.Router();
router.post("/getFightInfo", (req, res) => {
    const { role_id } = Global.getRoleGlobal(req);
    const { player, ...data } = Global.getFight(req);
    const role = [];
    const players = [];
    let arts = undefined;
    player.forEach(({ id, attr, art, name, pet }) => {
        if (id === role_id) {
            role.push({
                name,
                attr,
                pet
            })
            arts = art.map((itme) => (itme ? { id: itme.id, name: itme.n, s: itme.s } : { id: 0, name: '普通攻击' }));
            return;
        }
        players.push({ name, attr, pet });
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

    if (skill_pool.art) {
        Object.keys(skill_pool.art).forEach((key) => {
            const { n, id, p, l } = skill_pool.art[key]
            if (p !== 4 && l !== -1) {
                art.push({ name: n, id, })
            }
        })
    }
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
    let list = [];
    if (art) {
        Object.keys(art).forEach((key) => {
            const { n, id, p, l } = art[key]
            if (p !== 4 && l !== -1) {
                list.push({ n, id, })
            }
        })
    }
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
    const itme = list.find(({ id }) => dir == id);
    // 设置技能键未更改情况,不做处理返回之前战斗设置
    if (itme && (fight[index] === null || fight[index].id !== dir)) {
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

    const { art, attr, pet } = player[in_x];
    const { p2 = 0, s, id: artId } = art[index] || {};
    // 我方属性
    const playerAttr = fightFn.creatAttr(attr);
    // 敌方属性
    const rivalAttr = fightFn.creatAttr(rival[0].attr);

    // 定义回合文案
    const fightRound = {
        text: '', // 出招文案
        // rival_text: '', // 怪物出招文案
        buffText: [], // buff信息
        dps: 0, // 造成的伤害
        mana: '', // 消耗的法力
        life: '',// 消耗的生命
        statu: 0 // 结果
    }

    // 使用药品
    if (p2 === 2 && s > 0) {
        fightFn.drugDir(player, in_x, index);
    }
    if (p2 === 1) {
        const { message, p, data, art } = artFn.ArtHandler(req, artId, player, in_x, fightRound);
        // 法力不足
        if (message) {
            fightRound['text'] = message;
        } else if (p === 3) {
            // buff技能，更新玩家战斗属性
            player = data;
        } else {
            // 伤害技能,计算敌方生命与我方输出,文案写入回合信息中 fightRound
            rival = fightFn.artDir(art, player[in_x], playerAttr, rival, rivalAttr, fightRound);
        }
    }
    // 普通攻击
    if (p2 === 0) {
        rival = fightFn.normalDir(rival, playerAttr, rivalAttr, fightRound);
    }
    // 存在宠物
    if (pet && rival.length) {
        rival = fightFn.petDir(pet, rival, rivalAttr, fightRound);
    }


    // 判断战斗是否结束
    let statu = rival.length ? fightFn.rivalDir(player, in_x, rival, playerAttr, rivalAttr, fightRound) : 1;
    fightFn.computeBuffs(player, in_x, fightRound);

    // 指令结束,更新战斗池
    Global.updataFight(req, { player, rival });
    // 战斗结束
    if (statu !== 0) {
        // 释放战斗池,更新背包
        fightFn.releaseFight(req, res)
    }

    // 战胜
    if (statu === 1) {
        // 更新我状态
        freak.statu = statu;
        if (Global.getFight(req)) {
            Global.updataFight(req, { freak })
        }
        fightFn.getFightReward(req, res, freak);
        return;
    }

    if (statu === -1) {
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
        data: {
            ...fightRound,
            statu
        }
    })
    return;
});

router.post("/clean", (req, res) => {
    fightFn.releaseFight(req, res);
    res.send({
        code: 0,
        data: ''
    });
});
// 刷怪
router.post("/continue", (req, res) => {
    // 获取指令池,敌人信息
    const { extDir } = Global.getDir(req);
    if (!extDir.ext.boss) {
        fightFn.creatFight(req, res);
        res.send({
            code: 0,
            data: {
                path: '/fight'
            }
        });
    }

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

