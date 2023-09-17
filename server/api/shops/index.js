const express = require("express");
const router = new express.Router();
const { getList } = require('./getList');
const { purchase } = require('./purchase');
// 获取商城物品列表
router.post("/getList", getList);
// 购买商城物品
router.post("/purchase", purchase);
module.exports = router;
