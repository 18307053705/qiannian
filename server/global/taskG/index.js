const { TASK_TYPE_MEUN, TASK_TYPE_TEXT_MEUN, DAIL_TYPE_LIST } = require('./config')
const getCanTaskGlobal = require('./getCanTaskGlobal');
const setCanTaskGlobal = require('./setCanTaskGlobal');
const updataCanTaskGlobal = require('./updataCanTaskGlobal');
const getTaskGlobal = require('./getTaskGlobal');
const setTaskGlobal = require('./setTaskGlobal');
const updataTaskGlobal = require('./updataTaskGlobal');


module.exports = {
    TASK_TYPE_TEXT_MEUN,
    TASK_TYPE_MEUN,
    DAIL_TYPE_LIST,
    ...getCanTaskGlobal,
    ...setCanTaskGlobal,
    ...updataCanTaskGlobal,
    ...getTaskGlobal,
    ...setTaskGlobal,
    ...updataTaskGlobal,
}