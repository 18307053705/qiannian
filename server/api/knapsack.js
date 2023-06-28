const express = require("express");
const Global = require("../global");
const knapsackFn = require("../utils/knapsackFn");
const equipFn = require("../utils/equipFn");
const KnapsackTable = require("../table/knapsack");
const group1Table = require("../table/group1");
const group2Table = require("../table/group2");
const Equip = require("../table/equip");
const router = new express.Router();
// 获取背包信息
router.post("/getKnapsack", async (req, res) => {

    const { type } = req.body;
    const { data = [], tael, yuanbao } = await knapsackFn.getKnapsackInfo(req, type);
    res.send({
        code: 0,
        data: {
            list: data,
            tael: tael,
            yuanbao: yuanbao
        }
    })
});

// 获取物品信息
router.post("/getDetail", async (req, res) => {
    const { id, in_x, p, posKey, type } = req.body;
    if (!id && !p && !(posKey || (type && in_x !== undefined))) {
        res.send({
            code: 100005,
            message: '参数有误'
        })
        return;
    }
    // posKey
    // 人物装备详情
    if (posKey) {
        const { equip_pool: equipPool } = Global.getRoleGlobal(req);
        const { id, ext } = equipPool[posKey];
        const equip = Equip.getEquipTip(Equip[id], ext);
        res.send({
            code: 0,
            data: {
                equip: {
                    ...equip,
                    ...equipPool[posKey],
                    tips: Equip[id]['tips'],
                    n: equipPool[posKey]['name']
                }
            }
        })
        return;
    }
    const { data, tael, yuanbao } = await knapsackFn.getKnapsackInfo(req, type);
    // 验证物品信息
    if (!knapsackFn.chekeArticle(req, { ...data, s: 1 })) {
        res.send({
            code: 100005,
            message: '物品有误信息'
        })
        return;
    }
    const { ext, s } = data[in_x];
    // 物品为装备
    if (p === 3) {
        const equip = Equip.getEquipTip(Equip[id], ext);
        res.send({
            code: 0,
            data: {
                equip: {
                    ...equip,
                    ...data[in_x],
                    tips: Equip[id]['tips']
                }
            }
        })
        return;
    }
    const article = {
        ...KnapsackTable[id],
        ...data[in_x],
    };
    res.send({
        code: 0,
        data: { article }
    })
});

// 获取装备列表
router.post("/equipList", async (req, res) => {
    const { data } = Global.getknapsackGlobal(req);
    const list = [];
    data.forEach(((itme, index) => {
        if (itme.p === 3 && Equip[itme.id]) {
            list.push({
                ...itme,
                in_x: index,
                pos: Equip[itme.id]['pos']
            })
        }
    }))
    res.send({
        code: 0,
        data: list
    })
});

// 物品操作：type 1使用，2出库，3入库，4出售
router.post("/operate", async (req, res) => {
    const { in_x, s, type } = req.body;
    const { data, tael, yuanbao } = await knapsackFn.getKnapsackInfo(req, type);
    const msg = knapsackFn.chekeArticle(req, data);
    // 验证物品信息
    if (msg) {
        res.send({
            code: 100005,
            message: msg
        })
        return;
    }
    const { id, p, n } = data[in_x];
    let message = '';
    //  使用物品
    if (type === 1 && p !== 3) {
        let results = { message: '该物品无法直接使用。' };
        // 获取该物品是否可使用
        const { group1, group2 } = KnapsackTable[id];
        if (group1) {
            results = group1Table.groupFn(req, group1, s);
        }
        if (group2) {
            results = group2Table.groupFn(req, group2, s);
        }
        message = results.message;
        if (!results.message) {
            data[in_x]['s'] -= s;
            data[in_x]['s'] || data.splice(in_x, 1);
            Global.updateknapsackGlobal(req, { data })
        }
    }
    // 佩戴装备
    if (type === 1 && p === 3) {
        const { equip_pool, role_attr, role_level } = Global.getRoleGlobal(req);
        const results = equipFn.wearEquip(0, data[in_x], role_level, equip_pool, role_attr.addition);
        if (!results.message) {
            results.replace || data.splice(in_x, 1);
            Global.updateknapsackGlobal(req, { data });
            Global.updateRoleGlobal(req, { role_attr, equip_pool })
        }
        message = results.message;
    }
    // 入库
    if (type === 2) {
        const { data: wareData } = await knapsackFn.getKnapsackInfo(req, 3);
        const itme = { [id]: { id, p, n, s } }
        const article = p !== 3 ? { artReward: itme } : { equipReward: itme };
        message = knapsackFn.addKnapsack(article, wareData);
        if (!message) {
            data[in_x]['s'] -= s;
            data[in_x]['s'] || data.splice(in_x, 1);
            Global.updateknapsackGlobal(req, { data });
            await knapsackFn.updateWarehouse(req, { data: JSON.stringify(wareData) });
        } else {
            message = '仓库已满,无法继续存入物品';
        }
    }
    // 出库
    if (type === 3) {
        const { data: knaData } = await knapsackFn.getKnapsackInfo(req, 1);
        const itme = { [id]: { id, p, n, s } };
        const article = p !== 3 ? { artReward: itme } : { equipReward: itme };
        message = knapsackFn.addKnapsack(article, knaData);
        if (!message) {
            data[in_x]['s'] -= s;
            data[in_x]['s'] || data.splice(in_x, 1);
            Global.updateknapsackGlobal(req, { data: knaData });
            await knapsackFn.updateWarehouse(req, { data: JSON.stringify(data) });
        } else {
            message = '背包已满,无法继续取出物品';
        }
    }
    res.send({
        code: 0,
        message,
        data: {
            list: data,
            tael: tael,
            yuanbao: yuanbao
        }
    })

});




module.exports = router;
