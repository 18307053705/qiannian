const express = require("express");
const { create } = require('./create');
const { list } = require('./list');
const { detail } = require('./detail');
const { apply } = require('./apply');
const { active } = require('./active');
const { adjust } = require('./adjust');
const { getMaterial } = require('./getMaterial');
const { material } = require('./material');
const { exit } = require('./exit');

const router = new express.Router();

// 创建势力
router.post("/create", create);
// 势力列表
router.post("/list", list);
// 申请详情
router.post("/detail", detail);
// 申请势力
router.post("/apply", apply);
// 申请处理
router.post("/active", active);
// 成员管理
router.post("/adjust", adjust);
// 获取捐赠材料
router.post("/getMaterial", getMaterial);
// 捐赠材料
router.post("/material", material);
// 退出势力
router.post("/exit", exit);
module.exports = router;
