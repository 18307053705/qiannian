const express = require("express");
const { list } = require('./list');
const { artUp } = require('./artUp');


const router = new express.Router();

// 获取技能列表
router.post("/list", list);
// 技能领悟,升级,升转
router.post("/artUp", artUp);


module.exports = router;