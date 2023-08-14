const express = require("express");
const router = new express.Router();
const { getTaskList } = require('./getTaskList');
const { getTaskInfo } = require('./getTaskInfo');
// 获取任务列表
router.post("/getTaskList", getTaskList);
// 获取任务详情
router.post("/getTaskInfo", getTaskInfo);

module.exports = router;
