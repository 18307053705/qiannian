const express = require("express");
const router = new express.Router();

const { create } = require('./create');
const { detail } = require('./detail');
const { list } = require('./list');
const { modify } = require('./modify');
const { grounding } = require('./grounding');
const { purchase } = require('./purchase');

// 创建店铺
router.post('/create', create);
// 店铺详情
router.post('/detail', detail);
// 店铺列表
router.post('/list', list);
// 修改店铺名称
router.post('/modify', modify);
// 上/下架
router.post('/grounding', grounding);
// 购买
router.post('/purchase', purchase);
module.exports = router;