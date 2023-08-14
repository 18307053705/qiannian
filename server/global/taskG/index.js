const getCanTaskGlobal = require('./getCanTaskGlobal');
const setCanTaskGlobal = require('./setCanTaskGlobal');
const updataCanTaskGlobal = require('./updataCanTaskGlobal');
const getTaskGlobal = require('./getTaskGlobal');
const setTaskGlobal = require('./setTaskGlobal');
const updataTaskGlobal = require('./updataTaskGlobal');

const TASK_TYPE_MEUN = {
    main: 'main',
    exp: 'exp',
    tael: 'tael',
    world: 'world',
};
module.exports = {
    /**
     * 任务类型枚举
     * mian:主线,exp:每日经验,tael:每日金钱,world:每日声望
     */
    TASK_TYPE_MEUN,
    ...getCanTaskGlobal,
    ...setCanTaskGlobal,
    ...updataCanTaskGlobal,
    ...getTaskGlobal,
    ...setTaskGlobal,
    ...updataTaskGlobal,
}