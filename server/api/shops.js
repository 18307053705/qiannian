const express = require("express");
const router = new express.Router();
const Global = require("../global");
const Equip = require("../table/equip");
const KnapsackTable = require("../table/knapsack");
const knapsackFn = require("../utils/knapsackFn");
const shoppingFn = require("../utils/shoppingFn");

router.post("/getList", (req, res) => {
    const data = [];
    Object.keys(KnapsackTable).forEach(key => {
        if (key !== 'Maxs' && key !== 'size') {
            const { price, unit, id, n, type } = KnapsackTable[key];
            unit && data.push({ price, unit, id, n, type })
        }
    })
    res.send({
        code: 0,
        data
    })

});


router.post("/purchase", (req, res) => {
    const { id } = req.body;

});


const KANAPSACK_MEUN = {
    kanapsack: 1,
    role: 2,
    warehouse: 3,
    shopping: 4,
    shops: 5,
}

// 获取物品详情
router.post("/detail", async (req, res) => {
    const { id, in_x, kanapsackType } = req.body;
    if (!(id && in_x !== undefined && kanapsackType)) {
        res.send({
            code: 100005,
            message: '参数有误'
        })
        return;
    }
    const { role_id } = Global.getRoleGlobal(req);
    let articleInfo = undefined;
    // 物品在背包
    if (kanapsackType === KANAPSACK_MEUN.kanapsack) {
        const { data } = Global.getknapsackGlobal(req);
        articleInfo = data[in_x];
    }
    // 物品在身上(已穿戴装备)
    if (kanapsackType === KANAPSACK_MEUN.role) {
        const { data } = Global.getknapsackGlobal(req);
        articleInfo = data[in_x];
    }
    // 物品在仓库
    if (kanapsackType === KANAPSACK_MEUN.warehouse) {
        const { data } = await knapsackFn.getKnapsackInfo(req, 3);
        articleInfo = data[in_x];
    }
    // 物品在店铺
    if (kanapsackType === KANAPSACK_MEUN.shopping) {
        const { article } = await shoppingFn.getShopInfo(req);
        articleInfo = article ? article[in_x] : undefined;
    }
    if (kanapsackType === KANAPSACK_MEUN.shops) {
        articleInfo = KnapsackTable[id];
    }
    if (articleInfo) {
        const { p, id } = articleInfo;
        const data = {};
        if (p === 3) {
            const equip = Equip.getEquipTip(Equip[id]);
            data['equip'] = {
                ...equip,
                ...articleInfo,
                tips: Equip[id]['tips']
            }
        } else {
            data['article'] = {
                ...KnapsackTable[id],
                ...articleInfo,
            }
        }
        res.send({
            code: 0,
            data
        })
    }
});

module.exports = router;
