const express = require("express");
const mysql = require("../mysql");
const Global = require("../global");
const KnapsackTable = require("../table/knapsack");
const knapsackFn = require("../utils/knapsackFn");
const shoppingFn = require("../utils/shoppingFn");
const router = new express.Router();

router.post("/create", async (req, res) => {
    const { name } = req.body;
    if (!name) {
        res.send({
            code: 100005,
            message: '参数有误'
        })
        return;
    }
    const { role_id } = Global.getRoleGlobal(req);
    const { results } = await mysql.asyncQuery(`select * from shop where role_id="${role_id}" or name="${name}"`);
    if (results[0]) {
        res.send({
            code: 0,
            message: '店铺名重复!'
        })
        return;
    }
    const { tael } = Global.getknapsackGlobal(req);
    if (tael < 500000) {
        res.send({
            code: 0,
            message: '银两不足'
        })
        return;
    }

    const shopSql = "insert into shop(user_id,role_id,name,pet,article,date,role_name) values(?,?,?,?,?)";
    const shopData = [user, role.id, name, '{}', '[]', new Date() * 1, role.name];
    await mysql.asyncAdd(shopSql, shopData);
    Global.updateknapsackGlobal(req, {
        tael: tael - 500000
    })
    res.send({
        code: 0,
        data: {
            name,
            pet: '[]',
            article: '[]'
        }
    })
});


router.post("/modify", async (req, res) => {
    const { name } = req.body;
    if (!name) {
        res.send({
            code: 100005,
            message: '参数有误'
        })
        return;
    }

    const { results } = await mysql.asyncQuery(`select * from shop where name="${name}"`);
    if (results[0]) {
        res.send({
            code: 0,
            message: '店铺名重复!'
        })
        return;
    }
    const { tael } = Global.getknapsackGlobal(req);
    if (tael < 500000) {
        res.send({
            code: 0,
            message: '银两不足'
        })
        return;
    }
    await shoppingFn.updataShopInfo(req, { name })
    Global.updateknapsackGlobal(req, {
        tael: tael - 500000
    })
    const data = await shoppingFn.getShopInfo(req);
    res.send({
        code: 0,
        data: data
    })
});


router.post("/list", async (req, res) => {
    const { role_id } = Global.getRoleGlobal(req);
    const { results } = await mysql.asyncQuery(`select * from shop where role_id<>"${role_id}"`);
    res.send({
        code: 0,
        data: results
    })
});

router.post("/detail", async (req, res) => {
    const { role_id } = req.body;
    const data = await shoppingFn.getShopInfo(req, role_id);
    res.send({
        code: 0,
        data: JSON.stringify(data) === '{}' ? '' : data
    })
});

// active:1上架 2下架 type: 1 物品 2 宠物
router.post("/grounding", async (req, res) => {
    const { type, in_x, active, s, price } = req.body;
    if (!(type && active && in_x !== undefined)) {
        res.send({
            code: 100005,
            message: '参数有误'
        })
        return;
    }
    const { data } = Global.getknapsackGlobal(req);
    const { article } = await shoppingFn.getShopInfo(req);
    // 物品上架
    if (active === 1 && type === 1) {
        if (article.length === 50) {
            res.send({
                code: 0,
                message: '无法上架更多物品'
            })
            return;
        }
        if (!(data[in_x] && data[in_x]['s'] >= s && s <= KnapsackTable.Maxs)) {
            res.send({
                code: 0,
                message: '上架物品信息有误'
            })
            return;
        }
        article.push({
            ...data[in_x],
            s,
            price
        })
        data[in_x]['s'] -= s;
        if (!data[in_x]['s']) {
            data.splice(in_x, 1);
        }
        await shoppingFn.updataShopInfo(req, { article: JSON.stringify(article) });
        Global.updateknapsackGlobal(req, { data });
        res.send({
            code: 0,
            data
        })
        return;
    }
    // 物品下架
    if (active === 2 && type === 1) {
        if (data.length < KnapsackTable.size) {
            if (!article[in_x]) {
                res.send({
                    code: 0,
                    message: '下架物品信息有误'
                })
                return;
            }
            const info = article[in_x];
            article.splice(in_x, 1);
            const length = data.length - 1;
            for (let index = 0; index < length; index++) {
                const itme = data[index];
                if (itme.p === info.p && itme.id === info.id && itme.s <= KnapsackTable.Maxs) {
                    index = length;
                    data[index]['s'] = itme.s + info.s;
                    if (data[index]['s'] > KnapsackTable.Maxs) {
                        data[index]['s'] = KnapsackTable.Maxs;
                        info.s -= itme.s;
                    } else {
                        info.s = 0;
                    }
                }
            }
            if (info.s != 0) {
                data.push(info)
            }

            await shoppingFn.updataShopInfo(req, { article: JSON.stringify(article) });
            Global.updateknapsackGlobal(req, { data });
            res.send({
                code: 0,
                data: article
            });
            return;
        } else {
            res.send({
                code: 0,
                message: '背包已满，无法下架物品'
            })
        }
    }
});

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
