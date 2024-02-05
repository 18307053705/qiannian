const { TaskSystem } = require('@/system');
const { analyTaskReward } = require('./analyTaskReward');
const { analyDailyReward } = require('./analyDailyReward');
const { analyTaskComplete } = require('./analyTaskComplete');
const { analyTaskGrand } = require('./analyTaskGrand');
const { TASK_TYPE_MEUN, DAIL_TYPE_LIST, TASK_STATU } = TaskSystem;

module.exports = {
    // 解析任务
    analyTask: function (req, res, id, type, role) {
        const task = TaskSystem.getTask(id);
        // 每日任务奖励解析
        if (DAIL_TYPE_LIST.includes(type)) {
            task.reward = analyDailyReward(type, role.role_level);
        }
        // 主线任务奖励解析
        if (type === TASK_TYPE_MEUN.main) {
            task.reward = analyTaskReward(req, res, task.reward);
        }
        // 副本任务奖励解析
        if (type === TASK_TYPE_MEUN.copy) {
            task.reward = analyTaskReward(req, res, task.reward);
        }
        const { grand, complete } = task;
        // 地图解析
        if (grand) {
            analyTaskGrand(grand, type, id);
        }
        // 完成条件解析
        if (complete || grand.freak) {
            task.complete = analyTaskComplete(complete, grand);
        }
        task.taskType = type;
        task.status = TASK_STATU.wait;
        return task;
    }
}