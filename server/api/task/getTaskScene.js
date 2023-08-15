
const { GrandG, TaskG } = require('../../global');
const { taskFn } = require('../../utils');
const { TaskTable } = require('../../table');
module.exports = {
    /**
     * 获取任务场景信息
     */
    getTaskScene: function (req, res) {
        const { currentDir } = GrandG.getDirGlobal(req, res);
        const { taskId, taskType, isCan } = currentDir;

        let task = undefined;
        // 获取对应任务信息,存在代表未接任务,否则已接任务
        if (isCan) {
            const canTasks = TaskG.getCanTaskGlobal(req, res, taskType);
            task = canTasks[taskId];
        } else {
            const tasks = TaskG.getTaskGlobal(req, res, taskType);
            task = tasks[taskId];
        }
        // 判断任务是否存在
        if (!task) {
            res.send({
                code: 0,
                message: '任务信息有误'
            })
            return;
        }

        // 接取任务
        if (isCan) {
            TaskG.updataTaskGlobal(req, res, taskType, task);
            TaskG.deleteCanTaskGlobal(req, res, taskType, taskId);
        } else {
            // 完成任务 获取任务进度,判断是否有任务条件,没有代表可直接完成
            if (task.complete) {
                task.speed = taskFn.speedTask(req, res, task.complete);
            } else {
                task.speed = {};
                task.speed.done = true;
            }
            // 判断任务是否完成
            if (task.speed.done) {
                const message = taskFn.getTaskReward(req, res, task.reward);
                if (message) {
                    res.send({
                        code: 0,
                        message
                    })
                    return;
                }
                // 完成任务后判断是否有下个任务,有则加入未接任务
                if (task.nextId) {
                    const nextTask = taskFn.createTask(req, res, taskType, task.nextId, { noUpTaskG: true });
                    TaskG.updataCanTaskGlobal(req, res, taskType, nextTask);
                }
            }
        }

        res.send({
            code: 0,
            data: task
        })
    }
}