const express = require("express");
const { get } = require('./get');
const { gather } = require('./gather');
const { draw } = require('./draw');
const { chengId } = require('./chengId');
const { getMaterial } = require('./getMaterial');

const router = new express.Router();
// 获取聚宝盆信息
router.post("/get", get);
// 开始聚宝
router.post("/gather", gather);
// 聚宝盆等级抽奖
router.post("/draw", draw);
// 改变聚宝物品
router.post("/chengId", chengId);
// 获取元素材料列表
router.post("/getMaterial", getMaterial);
module.exports = router;