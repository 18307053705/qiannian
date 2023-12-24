const analyTask = require('./analyTask');
const speedTask = require('./speedTask');
const grandTaskEle = require('./grandTaskEle');
// const getTasksInfo = require('./getTasksInfo');
const listenTask = require('./listenTask');
const getTaskReward = require('./getTaskReward');
const getTaskScene = require('./getTaskScene');
const taskTp = require('./taskTp');
const getTaskGlobal = require('./getTaskGlobal');

module.exports = {
    ...analyTask,
    ...speedTask,
    ...grandTaskEle,
    // ...getTasksInfo,
    ...listenTask,
    ...getTaskReward,
    ...getTaskScene,
    ...taskTp,
    ...getTaskGlobal
}