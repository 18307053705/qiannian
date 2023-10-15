const createTask = require('./createTask');
const speedTask = require('./speedTask');
const grandTaskEle = require('./grandTaskEle');
const getTasksInfo = require('./getTasksInfo');
const listenTask = require('./listenTask');
const getTaskReward = require('./getTaskReward');
const getTaskSceneInfo = require('./getTaskSceneInfo');
const taskTp = require('./taskTp');

module.exports = {
    ...createTask,
    ...speedTask,
    ...grandTaskEle,
    ...getTasksInfo,
    ...listenTask,
    ...getTaskReward,
    ...getTaskSceneInfo,
    ...taskTp
}