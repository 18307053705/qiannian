const library = require('../../0library');
const { analyTaskReward } = require('./analyTaskReward');
const { analyDailyReward } = require('./analyDailyReward');
const { analyTaskComplete } = require('./analyTaskComplete');
const { analyTaskGrand } = require('./analyTaskGrand');
const { TASK_TYPE_MEUN, DAIL_TYPE_LIST } = require('../../meun');

module.exports = {
    // 解析任务
    analyTask: function (id, type, role) {
        const task = library.getTask(id);
        // 每日任务奖励解析
        if (DAIL_TYPE_LIST.includes(type)) {
            task.reward = analyDailyReward(type, role.role_level);
        }
        // 主线任务奖励解析
        if (type === TASK_TYPE_MEUN.main) {
            task.reward = analyTaskReward(task.reward, role);
        }
        // 副本任务奖励解析
        if (type === TASK_TYPE_MEUN.copy) {
            task.reward = analyTaskReward(task.reward, role);
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
        task.status = 0;
        return task;


    }
}