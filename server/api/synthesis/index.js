const express = require("express");
const { gather } = require('./gather');
const { getHandbook } = require('./getHandbook');
const { manufacture } = require('./manufacture');

const router = new express.Router();

// 采集天材地宝
router.post("/gather", gather);
// 获取合成图鉴
router.post("/getHandbook", getHandbook);
// 合成物品
router.post("/manufacture", manufacture);

module.exports = router;
