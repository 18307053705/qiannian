const createTask = require('./createTask');
const speedTask = require('./speedTask');
const grandTaskEle = require('./grandTaskEle');
const getTaskInfo = require('./getTaskInfo');

module.exports = {
    ...createTask,
    ...speedTask,
    ...grandTaskEle,
    ...getTaskInfo
}