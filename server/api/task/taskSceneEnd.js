

const { TaskSystem } = require('@/system');
const { GrandG, TaskG, DailysG } = require('@/global');
const { taskFn, grandFn, knapsackFn } = require('@/utils');
const { TASK_TYPE, TASK_TYPE_MEUN } = TaskG;

// 任务状态 0：未领取 1：未完成 2：可完成 3：已完成
module.exports = {
    /**
     * 任务场景结束,即完成任务
     */
    taskSceneEnd: function (req, res) {
        const { role_level, ...role } = RoleG.getRoleGlobal(req, res);
        const dir = GrandG.getDirGlobal(req, res);
        const { currentDir } = dir;
        const { taskId, taskType } = currentDir;
        const tasks = taskFn.getTaskGlobal(req, res, taskType, taskId);
        const task = tasks[taskId];
        // 不存在任务
        if (!task) {
            return res.send({
                code: 0,
                data: {
                    endText: '暂无更多任务！',
                }
            })
        }
        const { type, grand, level, complete, reward, levelText } = task;

        if (level > role_level) {
            return res.send({
                code: 0,
                data: {
                    levelText: levelText || `等级不足${level},先去升级吧！`,
                }
            })
        }

        // 记录最初状态
        const oldStatus = task.status;
        // // 判断是否为接任务且为副本 
        // if (oldStatus === 0 && taskType === TASK_TYPE_MEUN.copy) {
        //     const { copyTask } = DailysG.getDailysGlobal(req, res);
        //     if (copyTask[taskId] <= 0) {
        //         return res.send({
        //             code: 0,
        //             data: {
        //                 levelText: '今日领取次数已用完！',
        //             }
        //         })
        //     }
        //     copyTask[taskId] -= 1;
        //     DailysG.updataDailysGlobal(req, res, { copyTask });
        // }
        // 接任务
        if (task.status === 0) {
            task.status = 1;
        }
        // 未完成可转化已完成
        // 已完成可转化未完成
        if (task.status === 1 || task.status === 2) {
            // 计算任务进度
            const speed = taskFn.speedTask(req, res, task);
            task.status = speed.done ? 2 : 1;
        }


        let isCreta = false;
        // 领取对话任务，不可直接完成
        if (task.status === 2 && (oldStatus !== 0 || task.action)) {
            // 获取任务奖励
            const message = taskFn.getTaskReward(req, res, task.reward);
            if (message) {
                res.send({
                    code: 0,
                    message,
                    data: taskFn.getTaskSceneInfo(req, res, task),
                })
                return;
            }
            task.status = 3;
            isCreta = true;
        }
        TaskG.updataTaskGlobal(req, res, taskType, { [taskId]: task });
        if (!isCreta) {
            res.send({
                code: 0,
                data: taskFn.getTaskSceneInfo(req, res, task),
            })
            return;
        }

        // 完成任务后判断是否有下个任务,有则加入可领取任务,并且传送目标地
        const { nextId } = task;
        if (!nextId) {
            res.send({
                code: 0,
                data: {
                    endText: '暂无更多任务！',
                }
            })
            return;
        }
        // 创建下一个任务
        const nextTask = TaskSystem.analyTask(req, res, nextId, taskType);
        TaskG.updataTaskGlobal(req, res, taskType, { [nextId]: nextTask });
        const nextNpc = nextTask.grand.npc;
        // 判断下个任务领取的npc是否就是当前npc且位置相同
        //  是直接返回任务信息
        // 并且当前指令信息进行替换
        if (currentDir.id === nextNpc.id && currentDir.address === nextNpc.address) {
            GrandG.setDirGlobal(req, res, { currentDir: nextNpc });
            res.send({
                code: 0,
                data: taskFn.getTaskSceneInfo(req, res, nextTask),
                nextTask,
            })
            return;
        }
        // 否则传送至领取任务npc位置
        grandFn.tpDirUpdate(req, res, nextNpc.address);
    }
}
