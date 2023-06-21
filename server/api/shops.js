const express = require("express");
const KnapsackTable = require("../table/knapsack");

const router = new express.Router();

router.post("/getList", (req, res) => {
    const data = [];
    Object.keys(KnapsackTable).forEach(key => {
        if (key !== 'Maxs' && key !== 'size') {
            const { price, unit, id, n } = KnapsackTable[key];
            unit && data.push({ price, unit, id, n })
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


module.exports = router;
