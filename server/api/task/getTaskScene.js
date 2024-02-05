const { TaskSystem } = require('@/system');
const { GrandG, TaskG } = require('@/global');
const { taskFn } = require('@/utils');
const { TASK_STATU, TASK_TYPE, TASK_TYPE_MEUN } = TaskSystem;

module.exports = {
    /**
     * 获取任务场景信息
     */
    getTaskScene: function (req, res) {
        const { role_level } = RoleG.getRoleGlobal(req, res);
        const dir = GrandG.getDirGlobal(req, res);
        const { currentDir } = dir;
        const { taskId, taskType } = currentDir;
        const tasks = TaskG.getTaskGlobal(req, res, taskType);
        let task = tasks?.[taskId];
        // 副本任务加入不存在则解析任务
        if (!tasks && taskType === TASK_TYPE_MEUN.copy) {
            task = taskFn.analyTask(req, res, taskId, taskType);
        }

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
                    levelNoText: levelText || `等级不足${level},先去升级吧！`,
                }
            });
            return true;
        }

        // 待领取 返回场景
        if (task.status === TASK_STATU.wait) {
            res.send({
                code: 0,
                data: taskFn.getTaskScene(req, res, task),
            })
            return true;
        }

        // 获取场景，宝箱与迷宫类型任务不重新计算进度
        if (task.type !== TASK_TYPE.biaoxiang && task.type !== TASK_TYPE.migong) {
            // 未完成与可完成可互相改变
            if (task.status === TASK_STATU.wait_complete || task.status === TASK_STATU.can_complete) {
                // 计算任务进度
                task.complete = taskFn.speedTask(req, res, task);
                task.status = task.complete.done ? TASK_STATU.can_complete : TASK_STATU.wait_complete;
                TaskG.updataTaskGlobal(req, res, taskType, { [taskId]: task });
            }
        }

        res.send({
            code: 0,
            data: taskFn.getTaskScene(req, res, task)
        })
    }
}