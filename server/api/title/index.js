const express = require("express");
const { getTitleList } = require('./getTitleList');
const { wearTitle } = require('./wearTitle');

const router = new express.Router();
// 获取称号列表
router.post("/getTitleList", getTitleList);
// 称号佩戴与卸下
router.post("/wearTitle", wearTitle);
module.exports = router;