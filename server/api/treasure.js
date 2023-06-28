const express = require("express");
const router = new express.Router();
const Global = require("../global");
const knapsackFn = require("../utils/knapsackFn");
const group1 = require("../table/group1");
const knapsackTable = require("../table/knapsack");

router.post("/get", (req, res) => {
    const { treasure_pool, role_level } = Global.getRoleGlobal(req);
    const treasureG = Global.getTreasureGlobal(req);
    const data = {};
    Object.keys(treasure_pool).forEach(key => {
        if (treasureG[key]) {
            data[key] = {
                ...treasure_pool[key],
                s: treasureG[key]
            }
        } else {
            data[key] = treasure_pool[key]
        }
    })
    res.send({
        code: 0,
        data: {
            ...data,
            limits: role_level >= 50
        }
    })
});



const INTEGRAL_MEUN = {
    1: {
        id: 'fw',
        n: '房屋',
        key: 'world',
        name: '世界声望'
    },
    2: {
        id: 'xz',
        n: '勋章',
        key: 'gang',
        name: '帮会声望',
    },
    3: {
        id: 'lp',
        n: '令牌',
        key: 'intersect',
        name: '结义声望'
    },
    4: {
        id: 'hb',
        n: '徽标',
        key: 'exploit',
        name: '世界功勋'
    },
}

// 普通，黑铁,青铜,白银,黄金,白金,钻石，王者,传说，神话
// key 1 2 3 4
// type 1消耗元宝 2:消耗对应声望
router.post("/set", (req, res) => {
    const { type, key } = req.body;
    // 获取珍宝类型信息
    const treasureTypeInfo = INTEGRAL_MEUN[key];
    if (![1, 2].includes(type) || !treasureTypeInfo) {
        res.send({ code: 100005 });
        return;
    }
    const { role_integral, treasure_pool } = Global.getRoleGlobal(req);
    const { yuanbao } = Global.getknapsackGlobal(req);
    const treasure = treasure_pool[treasureTypeInfo.id];
    if (treasure.exp >= 10000000) {
        res.send({ code: 0, message: `${treasureTypeInfo.n}已达最顶级。` });
        return;
    }
    const g_treasure = Global.getTreasureGlobal(req);
    // 所有珍宝每日有十次免费操作
    if (g_treasure[treasureTypeInfo.id] >= 10) {
        // 消耗元宝
        if (type === 1) {
            if (yuanbao < 25) {
                res.send({ code: 0, message: '元宝不足25' });
                return;
            }
            Global.updateknapsackGlobal(req, { yuanbao: yuanbao - 50 });
        }
        // 消耗声望
        if (type === 2) {
            const integral = role_integral[treasureTypeInfo.key];
            if (integral < 50) {
                res.send({ code: 0, message: `${treasureTypeInfo.name}不足50` });
                return;
            }
            Global.updateRoleGlobal(req, {
                role_integral: {
                    ...role_integral,
                    [treasureTypeInfo.key]: integral - 50
                }
            });
        }
    } else {
        Global.updataTreasureGlobal(req, {
            [treasureTypeInfo.id]: g_treasure[treasureTypeInfo.id] + 1
        })
    }


    const { message } = Effect3.effect3Fn(req, `${treasureTypeInfo.id}-${Math.floor(Math.random() * (51 - 20)) + 20}`)
    res.send({
        code: 0,
        message
    })
});



router.post("/mosaic", (req, res) => {
    const { id } = req.body;
    if ([296, 297, 298, 299, 300, 301, 302].includes(id)) {
        const article = knapsackTable[id];
        let result = knapsackFn.deleteKnapsack(req, {
            [id]: {
                ...article,
                s: 1
            }
        })
        if (!result.message) {
            result = group1.groupFn(req, article.value)
        }
        res.send({
            code: 0,
            message: result.message
        })
    }
});

router.post("/atry", (req, res) => {
    const { treasure_pool, role_name } = Global.getRoleGlobal(req);
    const { yuanbao } = Global.getknapsackGlobal(req);
    if (treasure_pool['fw']['g'] === 0) {
        if (yuanbao < 200) {
            res.send({ code: 0, message: '元宝不足200' });
            return;
        }

        let rate = Math.floor(Math.random() * (2001 - 0));
        if (rate === 0) {
            rate = 100000;
            Global.snedSystem(`恭喜玩家：${role_name}搏一搏，天降鸿运获得了豪华住宅【青云观】，快去试一试运气吧。`)
        }
        if (rate < 3) {
            rate = 50000;
            Global.snedSystem(`恭喜玩家：${role_name}搏一搏，天降鸿运获得了顶级住宅【绿柳庄】，快去试一试运气吧。`)
        }
        if (rate < 10) {
            rate = 10000;
            Global.snedSystem(`恭喜玩家：${role_name}搏一搏，天降鸿运获得了顶级住宅[红砖屋]，快去试一试运气吧。`)
        }
        const { message } = Effect3.effect3Fn(req, `fw-${rate}`);
        const { treasure_pool: treasure } = Global.getRoleGlobal(req);
        treasure['fw']['g'] = 1;
        Global.updateRoleGlobal(req, { treasure_pool: treasure });
        Global.updateknapsackGlobal(req, { yuanbao: yuanbao - 200 });
        res.send({
            code: 0,
            message
        })
    }
});


module.exports = router;
