const { TASK_TYPE_MEUN, TASK_TYPE_TEXT_MEUN, DAIL_TYPE_LIST,TASK_TYPE_KEY_MEUN,TASK_TYPE } = require('./config');
const getTaskGlobal = require('./getTaskGlobal');
const updataTaskGlobal = require('./updataTaskGlobal');
const deleteTaskGlobal = require('./deleteTaskGlobal');


module.exports = {
    TASK_TYPE_KEY_MEUN,
    TASK_TYPE_TEXT_MEUN,
    TASK_TYPE_MEUN,
    DAIL_TYPE_LIST,
    TASK_TYPE,
    ...getTaskGlobal,
    ...updataTaskGlobal,
    ...deleteTaskGlobal,
    
}