

const { GrandG, TaskG, RoleG } = require('../../global');
const { taskFn, grandFn, knapsackFn } = require('../../utils');
const { TASK_TYPE } = TaskG;
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
        // 不存在任务
        if (!task) {
            return {
                endText: '暂无更多任务！',
            };
        }
        const { type, grand, level, complete, reward, } = task;

        if (level > role_level) {
            return {
                levelText: `等级不足${level},先去升级吧！`,
            };
        }

        // 记录最初状态
        const oldStatus = task.status;
        // 计算是否完成任务
        if (task.status === 0 || task.status === 1 || task.status === 2) {
            const speed = taskFn.speedTask(req, res, task);
            task.status = speed.done ? 2 : 1;
            TaskG.updataTaskGlobal(req, res, taskType, { [taskId]: task });
        }
        // 进行中，传送至任务目标
        if (task.status === 1) {
            taskFn.taskTp(req, res, task);
            return;
        }
        let message = undefined;
        // 完成任务  且 最初状态不为
        if (task.status === 2 && oldStatus !== 0) {
            // 获取任务奖励
            message = taskFn.getTaskReward(req, res, reward);
            if (!message) {
                // 收集任务，扣除背包物品
                if (type === TASK_TYPE.shouJi) {
                    knapsackFn.deleteKnapsack(req, res, { article: { ...complete.article, ...complete.equip } });
                }
                // 更新为已完成状态
                task.status = 3;
                TaskG.updataTaskGlobal(req, res, taskType, { [taskId]: task });
            }
        }
       
        // 任务未结束
        if (task.status !== 3) {
            res.send({
                code: 0,
                data: taskFn.getTaskSceneInfo(req, res, task),
                message
            })
            return;
        }
        // 已完成任务
        // 完成任务将任务从已领取队列中删除
        TaskG.deleteTaskGlobal(req, res, taskType, task.id);
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
        const nextTask = taskFn.createTask(req, res, taskType, nextId)[nextId];
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
                message
            })
            return;
        }
        // 否则传送至领取任务npc位置
        grandFn.tpDirUpdate(req, res, grand.npc.address)
    }
}
