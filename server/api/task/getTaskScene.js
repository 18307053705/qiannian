
const { GrandG, TaskG } = require('../../global');
const { taskFn } = require('../../utils');
const { TaskTable } = require('../../table');
module.exports = {
    /**
     * 获取任务场景信息
     */
    getTaskScene: function (req, res) {
        const dir = GrandG.getDirGlobal(req, res);
        let { currentDir } = dir;
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
        console.log(isCan, 'isCan...')
        let speed = { done: false };
        // 接取任务
        if (isCan) {
            TaskG.updataTaskGlobal(req, res, taskType, { [taskId]: task });
            TaskG.deleteCanTaskGlobal(req, res, taskType, taskId);
            // 当前元素指令更改为 已接取状态
            delete currentDir.isCan;
        } else {
            speed = taskFn.speedTask(req, res, task);
            // const { text } = tasks.reward || { text: [] };
            //  完成任务
            if (speed.done) {
                const message = taskFn.getTaskReward(req, res, task.reward);
                if (message) {
                    res.send({
                        code: 0,
                        message
                    })
                    return;
                }
                // 完成任务将任务从已领取队列中删除
                TaskG.deleteTaskGlobal(req, res, taskType, taskId);
                // 完成任务后判断是否有下个任务,有则加入已领取任务
                if (task.nextId) {
                    const nextTasks = taskFn.createTask(req, res, taskType, task.nextId);
                    task = nextTasks[task.nextId];
                    const { npc } = task.grand;
                    dir.currentDir = npc;
                }
            }
        }

        res.send({
            code: 0,
            data: {
                ...task,
                isCan,
                speed
            }
        })
    }
}