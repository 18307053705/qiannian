const createTask = require('./createTask');
const speedTask = require('./speedTask');
const grandTaskEle = require('./grandTaskEle');

module.exports = {
    ...createTask,
    ...speedTask,
    ...grandTaskEle
}