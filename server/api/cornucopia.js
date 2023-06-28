const express = require("express");
const router = new express.Router();
const Global = require("../global");
const knapsackFn = require("../utils/knapsackFn");
const cornuconpiaFn = require("../utils/cornuconpiaFn");
const Effect3 = require("../table/effect3");
const knapsackTable = require("../table/knapsack");


router.post("/getMaterial", (req, res) => {
    const { data } = Global.getknapsackGlobal(req);
    res.send({
        code: 0,
        data: {
            material: cornuconpiaFn.MATERIAL_ID_MEUN,
            list: data
        }
    })
});


router.post("/get", (req, res) => {
    const { treasure_pool, role_level } = Global.getRoleGlobal(req);
    const { id } = treasure_pool['jbp'];
    let name = ''
    if (id == 0) {
        const { id: jbpId, n } = cornuconpiaFn.getPrize(treasure_pool['jbp'])
        treasure_pool['jbp']['id'] = jbpId;
        name = n;
        Global.updateRoleGlobal(req, {
            treasure_pool
        })
    } else {
        name = knapsackTable[id].n;
    }

    res.send({
        code: 0,
        data: {
            jbp: {
                ...treasure_pool['jbp'],
                id: name
            },
            limits: role_level >= 50
        }
    })
});

// 需消耗一张玄机符
router.post("/chengId", (req, res) => {
    const { message } = knapsackFn.deleteKnapsack(req, {
        [308]: {
            ...knapsackTable[308],
            s: 1
        }
    })
    if (message) {
        res.send({
            code: 0,
            message
        })
        return;
    }
    const { treasure_pool } = Global.getRoleGlobal(req);
    const { id, n } = cornuconpiaFn.getPrize(treasure_pool['jbp']);
    treasure_pool['jbp'].id = id;
    Global.updateRoleGlobal(req, {
        treasure_pool
    })
    res.send({
        code: 0,
        data: n
    })
});


router.post("/gather", (req, res) => {
    const { materialIds = [] } = req.body;
    const { treasure_pool, role_level } = Global.getRoleGlobal(req);
    const { data } = Global.getknapsackGlobal(req);
    // 角色等级未达到50级，为非法操作
    if (role_level < 50) {
        return;
    }
    if (data.length === knapsackTable.size) {
        res.send({
            code: 0,
            message: '背包已满,请先清理背包'
        })
        return;
    }

    // 计算消耗材料
    const { MATERIAL_ID_MEUN } = cornuconpiaFn;
    const eleVal = {};
    const article = {};
    materialIds.forEach(({ id, s }) => {
        if (MATERIAL_ID_MEUN[id]) {
            const { value, key, n, type } = MATERIAL_ID_MEUN[id];
            eleVal[key] = eleVal[key] ? eleVal[key] + value * s : value * s;
            if (article[id]) {
                article[id].s += s;
            } else {
                article[id] = {
                    n,
                    type,
                    s
                }
            }
        }
    });
    const eleValueList = Object.values(eleVal);
    const itme = eleValueList.find((value) => value < 100);
    if (eleValueList < 5 || itme) {
        res.send({
            code: 0,
            message: '材料不足,聚宝失败!'
        })
        return;
    }
    // 消耗对应材料
    const { data: chengData, message } = knapsackFn.deleteKnapsack(req, article);
    if (message) {
        res.send({
            code: 0,
            message
        })
        return;
    }
    // 聚宝计算

    const rate = cornuconpiaFn.gatherRate(treasure_pool['jbp']);
    let { exp, lx, id } = treasure_pool['jbp'];
    let msg = '聚宝失败,聚宝经验+1';
    exp += 1;
    // 是否成功,背包增加对应物品
    if (rate) {
        const { n, type } = knapsackTable[id];
        msg = `恭喜玩家成功聚宝,获得:聚宝经验+2,${n}`;
        exp += 1;
        const artReward = {
            [id]: {
                id,
                n,
                type,
                s: 1
            }
        };
        knapsackFn.addKnapsack({ artReward }, chengData);
        Global.updateknapsackGlobal(req, { data: chengData });
    }
    // 计算聚宝盆等级经验等
    // 每级可获得3次抽奖机会,逆推获得聚宝盆等级
    // 最大30级
    const level = lx / 3;
    let upExp = level * 10 + 10;
    if (level > 9) {
        upExp = level % 10 * 1000 + 1000;
    }
    if (level > 19) {
        upExp = level % 10 * 10000 + 10000;
    }
    if (level < 30 && exp >= upExp) {
        lx += 3;
        exp -= exp;
    }
    treasure_pool['jbp'].exp = exp;
    treasure_pool['jbp'].lx = lx;
    // 重新生成聚宝物品
    const { id: jbpId } = cornuconpiaFn.getPrize(treasure_pool['jbp']);
    treasure_pool['jbp'].id = jbpId;
    Global.updateRoleGlobal(req, {
        treasure_pool
    });
    res.send({
        code: 0,
        data: msg
    })
});

// 聚宝盆等级抽奖
router.post("/draw", (req, res) => {
    const { treasure_pool, role_level, role_name } = Global.getRoleGlobal(req);
    const { data, yuanbao } = Global.getknapsackGlobal(req);
    // 角色等级未达到50级，为非法操作
    if (role_level < 50) {
        return;
    }
    if (data.length === knapsackTable.size) {
        res.send({
            code: 0,
            message: '背包已满,请先清理背包'
        })
        return;
    }
    const { lx, l } = treasure_pool['jbp'];
    if (lx === l) {
        res.send({
            code: 0,
            data: {
                msg: '有效抽奖次数为0'
            }
        })
        return;
    }
    const rate = Math.floor(Math.random() * (10000 - 0));

    let yuanbaoNum = 0;
    if (rate === 0) {
        yuanbaoNum = 5000;
        Global.snedSystem(`恭喜玩家：${role_name}在聚宝盆中获得5000元宝大奖，快去试一试运气吧。`)
    }
    if (rate < 3 && !yuanbaoNum) {
        yuanbaoNum = 2000;
        Global.snedSystem(`恭喜玩家：${role_name}在聚宝盆中获得2000元宝大奖，快去试一试运气吧。`)
    }
    if (rate < 50 && !yuanbaoNum) {
        yuanbaoNum = 200;
    }
    let msg = '';
    if (yuanbaoNum) {
        msg = `恭喜玩家获得${yuanbaoNum}元宝。`
        Global.updateRoleGlobal(req, { yuanbao: yuanbao + yuanbaoNum });
    } else {
        const { id, type, n } = cornuconpiaFn.getPrize(treasure_pool['jbp']);
        msg = `恭喜玩家获得${n}。`
        const artReward = {
            [id]: {
                id,
                n,
                type,
                s: 1
            }
        };
        knapsackFn.addKnapsack({ artReward }, data);
        Global.updateknapsackGlobal(req, { data });
    }

    treasure_pool['jbp'].l = l + 1;
    Global.updateRoleGlobal(req, {
        treasure_pool
    })
    res.send({
        code: 0,
        data: {
            msg,
            l: l + 1
        }
    })
});


module.exports = router;
