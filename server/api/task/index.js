const express = require("express");
const router = new express.Router();
const { getTaskList } = require('./getTaskList');
const { doneTask } = require('./doneTask');
const { getTaskScene } = require('./getTaskScene');
const { taskSceneActive } = require('./taskSceneActive');
const { completionTask } = require('./completionTask');
// 获取任务列表
router.post("/getTaskList", getTaskList);
// 获取任务奖励
router.post("/doneTask", doneTask);
// 获取任务场景
router.post("/getTaskScene", getTaskScene);
// 任务场景操作
router.post("/taskSceneActive", taskSceneActive);
// 任务场景操作
router.post("/completionTask", completionTask);
module.exports = router;
