

const { RANK_TASKS, RANK_TASK_Global, RANK_TASK_TYPE } = require('../config');
const { grandEle } = require('./grandEle')

module.exports = {
    /**
     * @param {*} req 
     * @param {*} res 
     * @param {*} taskId 任务id
     * @returns task || undefined
     * @returns task.id
     * @returns task.title 标题
     * @returns task.receive 领取文案
     * @returns task.fun 处理函数
     * @returns task.status 任务状态 0未接 1进行中 2完成
     * @returns task.freak
     * @returns freak.id
     * @returns freak.name
     * @returns freak.address
     * @returns freak.ext 怪物属性
     * @returns freak.c 击杀进度
     * @returns freak.s 需击杀
     * @returns freak.role 领取奖励角色id集合
     */
    createRankTask: function (req, res, taskId) {
        task = RANK_TASKS[taskId];
        task.freak = grandEle(task.freak);
        task.status = 0;
        const { type } = task;
        const { qingyuan, socialize_pool } = RoleG.getRoleGlobal(req, res);
        if (type === RANK_TASK_TYPE.qingyuan) {
            const { id } = qingyuan.d;
            RANK_TASK_Global[RANK_TASK_TYPE.qingyuan][id] || (RANK_TASK_Global[RANK_TASK_TYPE.qingyuan][id] = {});
            RANK_TASK_Global[RANK_TASK_TYPE.qingyuan][id][taskId] = task;
        }
        if (type === RANK_TASK_TYPE.xiulianfang) {
            const { id } = socialize_pool.gang;
            RANK_TASK_Global[RANK_TASK_TYPE.xiulianfang][id] || (RANK_TASK_Global[RANK_TASK_TYPE.xiulianfang][id] = {});
            RANK_TASK_Global[RANK_TASK_TYPE.xiulianfang][id][taskId] = task;
        }
        return JSON.parse(JSON.stringify(task));
    }
}