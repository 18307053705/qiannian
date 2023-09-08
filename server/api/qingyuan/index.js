const express = require("express");
const { getMarriage } = require('./getMarriage');
const { finish } = require('./finish');
const { attached } = require('./attached');

const router = new express.Router();
// 获取情缘信息
router.post("/getMarriage", getMarriage);
// 缔结情缘
router.post("/attached", attached);
// 情缘了结
router.post("/finish", finish);

module.exports = router;