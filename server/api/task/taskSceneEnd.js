

const { TaskSystem } = require('@/system');
const { GrandG, TaskG, DailysG } = require('@/global');
const { taskFn, grandFn, knapsackFn } = require('@/utils');
const { TASK_STATU } = TaskSystem;

// 任务状态 0：未领取 1：已领取 2：未完成 3：可完成 4:已完成
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
        let task = tasks?.[taskId];
        // 副本任务加入不存在则解析任务
        if (!tasks && taskType === TASK_TYPE_MEUN.copy) {
            task = taskFn.analyTask(req, res, taskId, taskType);
        }
        // 不存在任务
        if (!task) {
            return res.send({
                code: 0,
                data: {
                    endText: '暂无更多任务！',
                }
            })
        }
        const { level, levelText } = task;
       
        if (level > role_level) {
            return res.send({
                code: 0,
                data: {
                    levelNoText: levelText || `等级不足${level},先去升级吧！`,
                }
            })
        }

        // 接任务
        if (task.status === TASK_STATU.wait) {
            task.status = TASK_STATU.received;
            TaskG.updataTaskGlobal(req, res, taskType, { [taskId]: task });
            res.send({
                code: 0,
                data: taskFn.getTaskScene(req, res, task),
            })
            return;
        }
        const oldStatus = task.status;
        // 三者状态可转换未完成与可完成
        if (task.status === TASK_STATU.received || task.status === TASK_STATU.wait_complete || task.status === TASK_STATU.can_complete) {
            // 计算任务进度
            task.complete = taskFn.speedTask(req, res, task);
            task.status = task.complete.done ? TASK_STATU.can_complete : TASK_STATU.wait_complete;
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
            // 创建下一个任务
            if (task.nextId) {
                const nextTask = taskFn.analyTask(req, res, task.nextId, taskType);
                TaskG.updataTaskGlobal(req, res, taskType, { [task.nextId]: nextTask });
            }
        }
        TaskG.updataTaskGlobal(req, res, taskType, { [taskId]: task });

        // 已完成状态即传送至下个任务NPC位置
        if (oldStatus === TASK_STATU.finished) {
            if (!task.nextId) {
                res.send({
                    code: 0,
                    data: {
                        endText: '暂无更多任务！',
                    }
                })
                return;
            }
            // 判断下个任务领取的npc是否就是当前npc且位置相同
            // 是直接返回任务信息,并且当前指令信息进行替换
            const nextTask = TaskG.getTaskGlobal(req, res, taskType)[task.nextId];
            const nextNpc = nextTask.grand.npc;
            if (currentDir.id === nextNpc.id && currentDir.address === nextNpc.address) {
                GrandG.setDirGlobal(req, res, { currentDir: nextNpc });
                res.send({
                    code: 0,
                    data: taskFn.getTaskScene(req, res, nextTask),
                    nextTask,
                })
                return;
            }
            // 否则传送至领取任务npc位置
            grandFn.tpDirUpdate(req, res, nextNpc.address);
            return;
        }

        res.send({
            code: 0,
            data: taskFn.getTaskScene(req, res, task),
        })
    }
}
