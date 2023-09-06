

const { GrandG, TaskG, RoleG } = require('../../global');
const { taskFn, grandFn } = require('../../utils');

/**
 * 完成任务逻辑
 * @param {*} req 
 * @param {*} res 
 * @param {*} task 任务
 * @param {*} type 任务类型:mian...
 */
function doneTask(req, res, task, type) {
    const message = taskFn.getTaskReward(req, res, task.reward);
    if (message) {
        return message;
    }
    // 完成状态
    task.status = 3;
    // 完成任务后判断是否有下个任务,有则加入已领取任务
    if (task.nextId) {
        taskFn.createTask(req, res, type, task.nextId);
    }
}

// 领取任务逻辑
// 对话型任务，目标NPC便是自身，需返回完成任务对话内容,并获取对应奖励
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} task 
 */
function receiveTask(req, res, task) {
    const dir = GrandG.getDirGlobal(req, res);
    const { currentDir } = dir;
    const { taskType, taskId } = currentDir;
    const { type, grand } = task;
    const { npc, tNpc } = grand;
    let message = undefined;

    // 判断任务是否为对话型，且对话npc就是自身，并且坐标一致
    if (type === 2 && npc.id === tNpc.id && npc.address === tNpc.address) {
        task.status = 2;
        message = doneTask(req, res, task, taskType);
    }
    TaskG.updataTaskGlobal(req, res, taskType, { [taskId]: task });
    // 当前元素指令更改为 已接取状态
    return {
        ...task,
        npc: dir.currentDir,
        message
    }
}

module.exports = {
    /**
     * 任务场景结束,即完成任务
     */
    taskSceneEnd: function (req, res) {
        const { role_level } = RoleG.getRoleGlobal(req, res);
        const dir = GrandG.getDirGlobal(req, res);
        const { currentDir } = dir;
        const { taskId, taskType } = currentDir;
        const tasks = TaskG.getTaskGlobal(req, res, taskType);
        const task = tasks[taskId];
        // 没有任务
        if (!task) {
            res.send({
                code: 0,
                data: {
                    isEnd: true
                }
            })
            return;
        }
        // 角色等级不足
        if (task.level > role_level) {
            res.send({
                code: 0,
                data: {
                    noLevel: true,
                    level: task.level
                }
            })
            return;
        }
        // 接任务
        if (task.status === 0) {
            // 更新为已接状态
            task.status = 1;
            const { message, ...data } = receiveTask(req, res, task);
            res.send({
                code: 0,
                data,
                message
            })
            return;
        }
        // 完成任务
        if (task.status === 1 || task.status === 2) {
            const speed = taskFn.speedTask(req, res, task);
            let message = undefined;
            // 更新为进行中
            task.status = 1;
            if (speed.done) {
                // 更新为可完成状态
                task.status = 2;
                message = doneTask(req, res, task, taskType);
            }
            TaskG.updataTaskGlobal(req, res, taskType, { [taskId]: task });
            res.send({
                code: 0,
                data: {
                    ...task,
                    npc: dir.currentDir,
                },
                message
            })
            return;
        }
        // 任务已完成，传送至下个任务坐标
        if (task.status === 3) {
            // 完成任务将任务从已领取队列中删除
            TaskG.deleteTaskGlobal(req, res, taskType, task.id);
            if (task.nextId) {
                const { grand } = TaskG.getTaskGlobal(req, res, taskType)[task.nextId];
                grandFn.tpDirUpdate(req, res, grand.npc.address);
                return
            } else {
                res.send({
                    code: 0,
                    data: {
                        isEnd: true
                    }
                })
            }

        }
    }
}
