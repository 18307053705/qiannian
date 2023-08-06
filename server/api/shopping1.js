const express = require("express");
const mysql = require("../mysql");
const Global = require("../global/index2");
const KnapsackTable = require("../table/knapsack");
const knapsackFn = require("../utils/knapsackFn");
const shoppingFn = require("../utils/shoppingFn");
const router = new express.Router();



// 购买 type: 1 物品 2 宠物
router.post("/purchase", async (req, res) => {
    const { type, in_x, s, role_id } = req.body;
    if (!(type && in_x !== undefined && s && role_id)) {
        res.send({
            code: 100005,
            message: '参数有误'
        })
        return;
    }
    // 购买物品
    if (type === 1) {
        // 获取店主店铺信息
        const { article } = await shoppingFn.getShopInfo(req, role_id);
        if (!article[in_x]) {
            res.send({
                code: 0,
                message: '购买物品信息有误'
            })
            return;
        }
        // 获取我的背包信息
        const { data, tael } = Global.getknapsackGlobal(req);
        if (data.length === KnapsackTable.size) {
            res.send({
                code: 0,
                message: '背包已满，无法购买物品'
            })
            return;
        }


        const price = s * article[in_x]['price'];

        if (tael < price) {
            res.send({
                code: 0,
                message: '银两不足，无法购买物品'
            })
            return;
        }

        const info = article[in_x];
        const length = data.length;
        let rema = s;
        if (info.p != 3) {
            for (let index = 0; index < length; index++) {
                const itme = data[index];
                if (itme.p === info.p && itme.id === info.id && itme.s < KnapsackTable.Maxs) {
                    if (itme.s + rema > KnapsackTable.Maxs) {
                        data[index]['s'] = KnapsackTable.Maxs;
                        rema = itme.s + rema - KnapsackTable.Maxs;
                    } else {
                        data[index]['s'] += rema;
                        rema = 0;
                    }
                    index = length;
                }
            }
        }
        if (rema) {
            data.push({
                ...info,
                s: rema
            })
        }
        article[in_x]['s'] -= s;
        if (!article[in_x]['s']) {
            article.splice(in_x, 1);
        }
        await shoppingFn.updataShopInfo(req, { article: JSON.stringify(article) });
        // await knapsackFn.updateKnapsack(req, { data: JSON.stringify(data), tael: tael - price });
        Global.updateknapsackGlobal(req, { data, tael: tael - price });
        // 获取店主背包
        const { tael: tael_t } = await knapsackFn.getKnapsackInfo(req, 1, role_id);
        // 扣除20%手续费
        await knapsackFn.updateKnapsack(req, { tael: tael_t + parseInt(price * 0.8) }, role_id);
        res.send({
            code: 0,
            data: article
        });
        return;
    }
});


module.exports = router;
