const { RANK_TASK_TYPE } = require('./config');
const getRankTask = require('./getRankTask');
const updataRankTask = require('./updataRankTask');
const createRankTask = require('./createRankTask');
const getRankTaskAll = require('./getRankTaskAll');


module.exports = {
    RANK_TASK_TYPE,
    ...getRankTask,
    ...updataRankTask,
    ...createRankTask,
    ...getRankTaskAll
}