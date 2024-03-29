const express = require("express");
const router = new express.Router();
const { getTaskList } = require('./getTaskList');
const { getTaskInfo } = require('./getTaskInfo');
const { doneTask } = require('./doneTask');
const { getTaskScene } = require('./getTaskScene');
const { taskSceneEnd } = require('./taskSceneEnd');
// 获取任务列表
router.post("/getTaskList", getTaskList);
// 获取任务详情
router.post("/getTaskInfo", getTaskInfo);
// 获取任务奖励
router.post("/doneTask", doneTask);
// 获取任务场景
router.post("/getTaskScene", getTaskScene);
// 任务场景操作
router.post("/taskSceneEnd", taskSceneEnd);
module.exports = router;
