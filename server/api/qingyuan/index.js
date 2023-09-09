const express = require("express");
const { getMarriage } = require('./getMarriage');
const { finish } = require('./finish');
const { attached } = require('./attached');
const { treeManage } = require('./treeManage');

const router = new express.Router();
// 获取情缘信息
router.post("/getMarriage", getMarriage);
// 缔结情缘
router.post("/attached", attached);
// 情缘了结
router.post("/finish", finish);
// 树操作
router.post("/treeManage", treeManage);
module.exports = router;