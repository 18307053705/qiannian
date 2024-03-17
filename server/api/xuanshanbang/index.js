const express = require("express");
const { getCopyTaskList } = require('./getCopyTaskList');
const { receiveTask } = require('./receiveTask');
const { getTaskInfo } = require('./getTaskInfo');

const router = new express.Router();
// 获取副本列表
router.post("/getCopyTaskList", getCopyTaskList);
// 领取副本
router.post("/receiveTask", receiveTask);
// 获取任务详情
router.post("/getTaskInfo", getTaskInfo);

module.exports = router;