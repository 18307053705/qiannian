
const { TaskG, DailysG } = require('../../global');
const { createTask } = require('./createTask');
const { speedTask } = require('./speedTask');
const { DAIL_TYPE_LIST, TASK_TYPE_TEXT_MEUN, TASK_TYPE_KEY_MEUN } = TaskG;
module.exports = {
    /**
     * 获取任务信息
     * @param {*} type 任务类型 mian:主线,exp:每日经验,tael:每日金钱,world:每日声望
     * @returns message 错误信息
     * @returns task 任务信息
     */
    getTasksInfo: function (req, res, type) {
        let tasks = TaskG.getTaskGlobal(req, res, type);
        // 判断是否为每日任务,且不存在
        if (DAIL_TYPE_LIST.includes(type) && !tasks) {
            const daitys = DailysG.getDailysGlobal(req, res);
            const daitysKey = TASK_TYPE_KEY_MEUN[type];
            // 不可继续领取
            if (daitys[daitysKey] === -1 || !daitys[daitysKey]) {
                return {
                    message: `${TASK_TYPE_TEXT_MEUN[type]}已经达到领取上限。`
                }
            }
            // 每日任务减-1
            DailysG.updataDailysGlobal(req, res, { [daitysKey]: daitys[daitysKey] - 1 });
            // 创建任务
            tasks = createTask(req, res, type, Math.floor(Math.random() * 2) + 1, {
                callback: (task) => {
                    task.status = 1;
                }
            });
        }
        Object.values(tasks || {}).forEach((task) => {
            task.speed = speedTask(req, res, task);
        })
        return {
            tasks: tasks
        }

    }
}