const express = require("express");
const mysql = require("../mysql");
const Global = require("../global");
const knapsackFn = require("../utils/knapsackFn");
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
    const { user, role } = Global.getUserRole(req);
    const { results } = await mysql.asyncQuery(`select * from shop where role_id="${role.id}" or name="${name}"`);
    if (results[0]) {
        res.send({
            code: 0,
            message: '店铺名重复!'
        })
        return;
    }
    const { tael } = await knapsackFn.getKnapsackInfo(req, 1);
    if (tael < 500000) {
        res.send({
            code: 0,
            message: '银两不足'
        })
        return;
    }
    const shopSql = "insert into shop(user_id,role_id,name,pet,article) values(?,?,?,?,?)";
    const shopData = [user, role.id, name, '{}', '[]'];
    await mysql.asyncAdd(shopSql, shopData);
    await knapsackFn.updateKnapsack(req, {
        tael: tael - 500000
    });
    res.send({
        code: 0,
        data: {
            name,
            pet: '[]',
            article: '[]'
        }
    })
});

router.post("/list", async (req, res) => {
    const { results } = await mysql.asyncQuery(`select * from shop`);
    res.send({
        code: 0,
        data: results
    })
});

router.post("/detail", async (req, res) => {
    const { role_id } = req.body;
    const { role } = Global.getUserRole(req);
    const { results } = await mysql.asyncQuery(`select * from shop where role_id="${role_id || role.id}"`);
    res.send({
        code: 0,
        data: results[0]
    })
});



module.exports = router;
