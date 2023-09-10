const { RANK_TASK_TYPE, RANK_TASKS ,ADDRESS_LIST} = require('./list');


/**
 * 组队任务池
 */
const RANK_TASK_Global = {
    // 情缘任务
    [RANK_TASK_TYPE.qingyuan]: {
        // id: { // 情缘id
        //     task: '任务信息',
        // }
    },
    // 修炼房任务: 同上
    [RANK_TASK_TYPE.xiulianfang]: {

    }
}


module.exports = {
    RANK_TASK_Global,
    RANK_TASK_TYPE,
    RANK_TASKS,
    ADDRESS_LIST
}