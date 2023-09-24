const express = require("express");
const router = new express.Router();
const { getList } = require('./getList');
const { purchase } = require('./purchase');
const { shopIntegral } = require('./shopIntegral');
const { getIntegralList } = require('./getIntegralList');
const { getequipList } = require('./getequipList');
const { shopEquip } = require('./shopEquip');
// 获取商城物品列表
router.post("/getList", getList);
// 购买商城物品
router.post("/purchase", purchase);
// 兑换神装积分物品
router.post("/shopIntegral", shopIntegral);
// 获取可兑换物品列表
router.post("/getIntegralList", getIntegralList);
// 获取铁匠铺装备列表
router.post("/getequipList", getequipList);
// 购买装备
router.post("/shopEquip", shopEquip);
module.exports = router;
