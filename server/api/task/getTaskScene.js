
const { TaskSystem } = require('@/system');
const { GrandG, TaskG } = require('@/global');
const { taskFn } = require('@/utils');
const { TASK_STATU } = TaskSystem;

module.exports = {
    /**
     * 获取任务场景信息
     */
    getTaskScene: function (req, res) {
        const { role_level } = RoleG.getRoleGlobal(req, res);
        const dir = GrandG.getDirGlobal(req, res);
        const { currentDir } = dir;
        const { taskId, taskType } = currentDir;
        const tasks = taskFn.getTaskGlobal(req, res, taskType, taskId);
        const task = tasks[taskId];
        // 不存在任务
        if (!task) {
            res.send({
                code: 0,
                data: {
                    endText: '暂无更多任务！',
                }
            })
            return true;
        }
        const { level, levelText } = task;

        if (level > role_level) {
            res.send({
                code: 0,
                data: {
                    levelText: levelText || `等级不足${level},先去升级吧！`,
                }
            });
            return true;
        }
        // 接任务
        if (task.status === TASK_STATU.wait) {
            task.status = TASK_STATU.received;
            TaskG.updataTaskGlobal(req, res, taskType, { [taskId]: task });
            res.send({
                code: 0,
                data: taskFn.getTaskScene(req, res, task),
            })
            return true;

        }
        // 三者状态可转换未完成与可完成
        if (task.status === TASK_STATU.received || task.status === TASK_STATU.wait_complete || task.status === TASK_STATU.can_complete) {
            // 计算任务进度
            task.complete = taskFn.speedTask(req, res, task);
            task.status = task.complete.done ? TASK_STATU.can_complete : TASK_STATU.wait_complete;
            TaskG.updataTaskGlobal(req, res, taskType, { [taskId]: task });
        }
        // 判断任务是否完成
        if (task.status === TASK_STATU.can_complete) {
            // 获取任务奖励
            const message = taskFn.getTaskReward(req, res, task.reward);
            if (message) {
                res.send({
                    code: 0,
                    message,
                    data: taskFn.getTaskScene(req, res, task),
                })
                return;
            }
            // 改变未已完成
            task.status = TASK_STATU.finished;
            TaskG.updataTaskGlobal(req, res, taskType, { [taskId]: task });
            // 创建下一个任务
            if (task.nextId) {
                const nextTask = TaskSystem.analyTask(req, res, task.nextId, taskType);
                console.log(nextTask,'nextTask...')
                TaskG.updataTaskGlobal(req, res, taskType, { [task.nextId]: nextTask });
            }
        }
        res.send({
            code: 0,
            data: taskFn.getTaskScene(req, res, task),
            mians: TaskG.getTaskGlobal(req, res, 1)
        })
    }
}