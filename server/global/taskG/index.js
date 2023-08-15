const { TASK_TYPE_MEUN, TASK_TYPE_TEXT_MEUN, DAIL_TYPE_LIST } = require('./config');
const getTaskGlobal = require('./getTaskGlobal');
const getCanTaskGlobal = require('./getCanTaskGlobal');
const updataTaskGlobal = require('./updataTaskGlobal');
const updataCanTaskGlobal = require('./updataCanTaskGlobal');
const deleteTaskGlobal = require('./deleteTaskGlobal');
const deleteCanTaskGlobal = require('./deleteCanTaskGlobal');


module.exports = {
    TASK_TYPE_TEXT_MEUN,
    TASK_TYPE_MEUN,
    DAIL_TYPE_LIST,
    ...getTaskGlobal,
    ...getCanTaskGlobal,
    ...updataTaskGlobal,
    ...updataCanTaskGlobal,
    ...deleteTaskGlobal,
    ...deleteCanTaskGlobal
}