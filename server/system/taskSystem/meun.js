
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
const TASK_TYPE = {
    zhanDou: 1,
    duiHua: 2,
    shouJi: 3
}
const TASK_TYPE_MEUN = {
    main: 1,
    exp: 2,
    world: 3,
    tael: 4,
    exploit: 5,
    gang: 6,
    intersect: 7,
    chance: 8,
    copy: 9,
    zudui: 10,
}

const TASK_TYPE_KEY_MEUN = {
    [TASK_TYPE_MEUN.main]: 'main',
    [TASK_TYPE_MEUN.exp]: 'exp',
    [TASK_TYPE_MEUN.tael]: 'tael',
    [TASK_TYPE_MEUN.world]: 'world',
    [TASK_TYPE_MEUN.gang]: 'gang',
    [TASK_TYPE_MEUN.intersect]: 'intersect',
    [TASK_TYPE_MEUN.exploit]: 'exploit',
    [TASK_TYPE_MEUN.chance]: 'chance',
    [TASK_TYPE_MEUN.copy]: 'copy',
    [TASK_TYPE_MEUN.zudui]: 'zudui',
};
const TASK_TYPE_TEXT_MEUN = {
    [TASK_TYPE_MEUN.main]: '主线任务',
    [TASK_TYPE_MEUN.exp]: '每日经验',
    [TASK_TYPE_MEUN.tael]: '每日金钱',
    [TASK_TYPE_MEUN.world]: '每日声望',
    [TASK_TYPE_MEUN.gang]: '每日帮会',
    [TASK_TYPE_MEUN.intersect]: '每日结义',
    [TASK_TYPE_MEUN.exploit]: '每日功勋',
    [TASK_TYPE_MEUN.chance]: '奇遇任务',
    [TASK_TYPE_MEUN.copy]: '副本任务',
    [TASK_TYPE_MEUN.zudui]: '组队副本',
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
    TASK_TYPE_MEUN,
    TASK_TYPE_TEXT_MEUN,
    DAIL_TYPE_LIST,
    TASK_TYPE_KEY_MEUN,
    TASK_TYPE
}