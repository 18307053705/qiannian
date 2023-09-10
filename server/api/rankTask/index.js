const express = require("express");
const router = new express.Router();
const { getTaskScene } = require('./getTaskScene');
const { active } = require('./active');

// 获取任务场景
router.post("/getTaskScene", getTaskScene);
// 任务操作
router.post("/active", active);
module.exports = router;
