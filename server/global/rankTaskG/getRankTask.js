

const { RANK_TASKS, RANK_TASK_Global, RANK_TASK_TYPE } = require('./config');

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
    getRankTask: function (req, res, taskId) {
        const { type } = RANK_TASKS[taskId];
        const { qingyuan, socialize_pool } = RoleG.getRoleGlobal(req, res);
        let tasks = undefined;
        if (type === RANK_TASK_TYPE.qingyuan) {
            const { id } = qingyuan.d;
            tasks = RANK_TASK_Global[RANK_TASK_TYPE.qingyuan][id];
        }
        if (type === RANK_TASK_TYPE.xiulianfang) {
            const { id } = socialize_pool.gang;
            tasks = RANK_TASK_Global[RANK_TASK_TYPE.xiulianfang][id];
        }
        if (tasks) {
            return tasks[taskId] ? JSON.parse(JSON.stringify(tasks[taskId])) : undefined
        }
    }
}