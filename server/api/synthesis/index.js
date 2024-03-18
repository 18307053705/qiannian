const express = require("express");
const { gather } = require('./gather');
const { getHandbook } = require('./getHandbook');
const { manufacture } = require('./manufacture');
const { getHandbookOther } = require('./getHandbookOther');
const { manufactureOther } = require('./manufactureOther');

const router = new express.Router();

// 采集天材地宝
router.post("/gather", gather);
// 获取合成图鉴
router.post("/getHandbook", getHandbook);
// 合成物品
router.post("/manufacture", manufacture);
// 获取强化卡，魔符，技能书合成图鉴
router.post("/getHandbookOther", getHandbookOther);
// 合成 强化卡，魔符，技能书
router.post("/manufactureOther", manufactureOther);
module.exports = router;
