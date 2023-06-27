const express = require("express");
const router = new express.Router();
const Global = require("../global");
const knapsackFn = require("../utils/knapsackFn");
const Effect3 = require("../table/effect3");
const knapsackTable = require("../table/knapsack");


const materialIds = {
    ice: [213, 214, 215],
    mine: [210, 211, 212],
    wind: [207, 208, 209],
    water: [216, 217, 218],
    fire: [219, 220, 221],
}

const getMaterial = () => {
    const material = {};
    Object.keys(materialIds).forEach(key => {
        materialIds[key].forEach((id) => {
            material[id] = {
                ...knapsackTable[id],
                key
            };
        })
    })
    return material;
}

router.post("/getMaterial", (req, res) => {
    const { data } = Global.getknapsackGlobal(req);
    res.send({
        code: 0,
        data: {
            material: getMaterial(),
            list: data
        }
    })
});


router.post("/get", (req, res) => {
    const { treasure_pool, role_level } = Global.getRoleGlobal(req);
    res.send({
        code: 0,
        data: {
            jbp: treasure_pool['jbp'],
            limits: role_level >= 50
        }
    })
});

router.post("/chengId", (req, res) => {
    const { treasure_pool, role_level } = Global.getRoleGlobal(req);
    res.send({
        code: 0,
        data: {
            jbp: treasure_pool['jbp'],
            limits: role_level >= 50
        }
    })
});


router.post("/gather", (req, res) => {
    const { materialIds = {} } = req.body;
    const article = {};

    knapsackFn.deleteKnapsack(req,article);

    // const { material } = Global.getRoleGlobal(req);
    res.send({
        code: 0,
        data: {
            jbp: treasure_pool['jbp'],
            limits: role_level >= 50
        }
    })
});






module.exports = router;
