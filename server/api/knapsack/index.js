const express = require("express");
const { getKnapsack } = require('./getKnapsack');
const { operate } = require('./operate');
const { getArticleDetail } = require('./getArticleDetail');

const router = new express.Router();

// 获取背包或者仓库信息
router.post("/getKnapsack", getKnapsack);
// 物品 使用 入库 出库 丢弃
router.post("/operate", operate);
// 获取物品详情
router.post("/getArticleDetail", getArticleDetail);

module.exports = router;