
/**
 * 全局任务信息数据结构mian:主线,exp:每日经验,tael:每日金钱,world:每日声望
 */
const TASKS_Global = {
    // role_id:{
    //     mian:{},
    //     exp:{}, 
    //     tael:{},
    //     world:{},
    // }
}

const CAN_TASKS_Global = {
    // role_id:{
    //     mian:{},
    //     exp:{}, 
    //     tael:{},
    //     world:{},
    // }
}

const TASK_TYPE_MEUN = {
    main: 'main',
    exp: 'exp',
    tael: 'tael',
    world: 'world',
    exploit: 'exploit',
    gang: 'gang',
    intersect: 'intersect',
    chance: 'chance',
    copy: 'copy',
};
const TASK_TYPE_TEXT_MEUN = {
    main: '主线任务',
    exp: '每日经验',
    tael: '每日金钱',
    world: '每日声望',
    gang: '每日帮会',
    intersect: '每日结义',
    exploit: '每日功勋',
    chance: '奇遇任务',
    copy: '副本任务',
};
const DAIL_TYPE_LIST = [
    TASK_TYPE_MEUN.exp,
    TASK_TYPE_MEUN.world,
    TASK_TYPE_MEUN.tael,
    TASK_TYPE_MEUN.exploit,
    TASK_TYPE_MEUN.gang,
    TASK_TYPE_MEUN.intersect,
];
module.exports = {
    TASKS_Global,
    CAN_TASKS_Global,
    TASK_TYPE_MEUN,
    TASK_TYPE_TEXT_MEUN,
    DAIL_TYPE_LIST
}