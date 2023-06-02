const express = require("express");
const roleFn = require("../utils/roleFn");
const router = new express.Router();

router.post("/getKnapsack", async (req, res) => {
    const result = await roleFn.getKnapsack(req);
    res.send({
        code: 0,
        data: {
            list: JSON.parse(result.data),
            tael: result.tael,
            yuanbao: result.yuanbao
        }
    })
});



module.exports = router;
