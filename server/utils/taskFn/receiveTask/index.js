const { RoleG, TaskG, DailysG } = require('@/global');
const { TaskSystem } = require('@/system');
const { verification } = require('./verification')
const { TASK_TYPE_MEUN } = TaskSystem;
// 领取任务
// 主线 - 等级
// 每日 - 数量
// 副本 - 数量，等级
// 奇遇 - 无(等级到后，自动领取)
// 组队副本 - 帮会，庄园，情缘
module.exports = {
    /**
     * 领取任务
     * @param {*} req 
     * @param {*} res 
     * @param {*} taskID  任务id
     * @param {*} taskType 任务类型
     * @returns task
     */
    receiveTask: function (req, res, taskID, taskType) {
        const role = RoleG.getRoleGlobal(req, res);
        const task = TaskSystem.getTask(taskID);
        const dailys = DailysG.getDailysGlobal(req, res, role.role_id);
        // 检验领取条件
        const message = verification(role, task, dailys, taskType);
        if (message) {
            res.send({
                code: 0,
                message,
            })
            return undefined;
        }
        // 领取任务非：主线，奇遇，组队 更新每日信息
        if (taskType !== TASK_TYPE_MEUN.main || taskType !== TASK_TYPE_MEUN.chance || taskType !== TASK_TYPE_MEUN.zudui) {
            DailysG.updataDailysGlobal(req, res, dailys);
        }
        // 解析任务
        const tasks = TaskSystem.analyTask(task);
        // 加入任务池
        TaskG.updataTaskGlobal(req, res, role.role_id, tasks);
        return JSON.parse(JSON.stringify(tasks));
    }
}
