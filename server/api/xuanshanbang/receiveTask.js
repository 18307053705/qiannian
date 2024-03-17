const { DailysG, TaskG } = require('@/global');
const { TaskSystem } = require('@/system');
const { taskFn } = require('@/utils');
const { TASK_TYPE_MEUN, TASK_STATU } = TaskSystem;

module.exports = {
    /**
     * 领取副本
     * @param {*} req.id 任务id
     * @param {*} req.type 1：领取 2：完成
     */
    receiveTask: function (req, res) {
        const { id, type } = req.body;
        // 获取角色信息
        const { role_level } = RoleG.getRoleGlobal(req, res);
        // 获取每日副本领取数量信息
        const { copyTask } = DailysG.getDailysGlobal(req, res);
        // 获取已领取全部副本任务信息
        const taskAll = TaskG.getTaskGlobal(req, res, TASK_TYPE_MEUN.copy) || {};
        // 获取自身任务信息
        let task = taskAll[id] || { status: 0 };
        // 领取悬赏
        if (type === 1) {
            if (task.status !== TASK_STATU.wait) {
                res.send({
                    code: 0,
                    message: '该悬赏已领取，无需重复领取'
                })
                return;
            }

            if (copyTask[id] === 0) {
                res.send({
                    code: 0,
                    message: '该悬赏今日已达上限，无法继续领取'
                })
                return;
            }
            // 创建副本任务
            task = taskFn.analyTask(req, res, id, TASK_TYPE_MEUN.copy);
            if (role_level < task.level) {
                res.send({
                    code: 0,
                    message: task.levelText
                })
                return;
            }
            task.status = TASK_STATU.wait_complete;
            TaskG.updataTaskGlobal(req, res, TASK_TYPE_MEUN.copy, { [id]: task });
            // 副本任务减一
            copyTask[id]--;
            DailysG.updataDailysGlobal(req, res, { copyTask });
            res.send({
                code: 0,
                success: '悬赏任务领取成功。'
            })
            return;
        }


        if (type === 2) {
            if (task.status === TASK_STATU.wait) {
                res.send({
                    code: 0,
                    message: '悬赏任务未接受，无法领取奖励。'
                })
                return;
            }
            // 计算任务进度
            task.complete = taskFn.speedTask(req, res, task);
            if (!task.complete.done) {
                res.send({
                    code: 0,
                    message: '悬赏任务未完成 ，无法领取奖励。'
                })
                return;
            }
            // 获取任务奖励
            const message = taskFn.getTaskReward(req, res, task.reward);
            if (message) {
                res.send({
                    code: 0,
                    message,
                })
                return;
            }
            // 已完成
            task.status = TASK_STATU.finished;
            // 更新任务信息
            TaskG.deleteTaskGlobal(req, res, TASK_TYPE_MEUN.copy, id);
            res.send({
                code: 0,
                data: task.reward,
            })
        }
    }
}
