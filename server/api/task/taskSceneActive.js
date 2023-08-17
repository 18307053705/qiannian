

const { GrandG, TaskG } = require('../../global');
const { taskFn } = require('../../utils');
module.exports = {
    /**
     * 任务场景操作
     */
    taskSceneActive: function (req, res) {
        let { currentDir } = GrandG.getDirGlobal(req, res);
        const { taskId, taskType, isCan, repeat } = currentDir;
        console.log(currentDir, 'currentDir...')
        // isCan true代表当前元素指令为领取任务npc,即场景为领取任务
        // 场景为领取任务分三种情况
        // 一、完成任务npc与领取任务npc坐标一致,改变元素指令为完成任务
        // 二、完成任务npc与领取任务npc坐标不一致,传送到目标位坐标
        // 三、传送至击杀目标位置
        // 接任务
        if (isCan) {
            const tasks = TaskG.getCanTaskGlobal(req, res, taskType);
            const task = tasks[taskId];
            // 加入已接任务池
            TaskG.updataTaskGlobal(req, res, taskType, { [taskId]: task });
            // 删除对应未接任务池
            TaskG.deleteCanTaskGlobal(req, res, taskType, taskId);
            // const { type, grand } = task;
            // 完成任务npc与领取任务npc坐标一致,改变当前元素指令为已接,并返回对应任务信息
            if (repeat) {
                delete currentDir.isCan;
                res.send({
                    code: 0,
                    data: task
                })
                return;
            }
            res.send({
                code: 0,
                path: '/grand'
            })

            return;
        }
        // 完成任务
        const tasks = TaskG.getTaskGlobal(req, res, taskType);
        const task = tasks[taskId];
        task.speed = taskFn.speedTask(req, res, task.complete);
        // 完成任务
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
                const nextTask = taskFn.createTask(req, res, taskType, task.nextId, { noUpTaskG: true, isCan: true });
                TaskG.updataCanTaskGlobal(req, res, taskType, nextTask);
                const { grand } = nextTask[task.nextId];
                if (grand.npc.address === currentDir.address) {
                    currentDir = grand.npc;
                    res.send({
                        code: 0,
                        data: {
                            ...nextTask[task.nextId],
                            isCan: currentDir.isCan
                        },

                    })
                    return;
                }
            }
        }

    }



}

