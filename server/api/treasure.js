const express = require("express");
const router = new express.Router();
const Global = require("../global");
const roleFn = require("../utils/roleFn");
router.post("/get", (req, res) => {
    const { role_id } = req.body;
});
// 普通，黑铁,青铜,白银,黄金,白金,钻石，王者,传说，神话
// key fw zx lp hb jbp
// type 1消耗元宝 2:消耗对应声望
router.post("/set", (req, res) => {
    const { type, key } = req.body;
    const { role_integral } = Global.getRoleGlobal(req);
    const { yuanbao } = Global.getknapsackGlobal(req);

});



module.exports = router;
