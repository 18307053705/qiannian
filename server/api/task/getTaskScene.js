
const { GrandG, TaskG, RoleG } = require('../../global');
const { taskFn } = require('../../utils');
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
module.exports = {
    /**
     * 获取任务场景信息
     */
    getTaskScene: function (req, res) {
        const dir = GrandG.getDirGlobal(req, res);
        const { role_level } = RoleG.getRoleGlobal(req, res);
        const { currentDir } = dir;
        const { taskId, taskType } = currentDir;
        const tasks = TaskG.getTaskGlobal(req, res, taskType) || {};
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
        const { status, level, grand } = task;
        // 角色等级不足
        if (level > role_level) {
            res.send({
                code: 0,
                data: {
                    noLevel: true,
                    level
                }
            })
            return;
        }
        let message = undefined;
        // 完成任务
        if ((status === 1 || status === 2) && (!grand.tNpc || grand.tNpc.id === currentDir.id)) {
            const speed = taskFn.speedTask(req, res, task);
            task.status = 1;
            if (speed.done) {
                // 更新为可完成状态
                task.status = 2;
                message = doneTask(req, res, task, taskType);
                TaskG.updataTaskGlobal(req, res, taskType, { [taskId]: task });
            }
        }

        res.send({
            code: 0,
            data: {
                ...task,
                npc: dir.currentDir,
                role_level
            },
            message
        })
    }
}