

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

        // 接任务逻辑
        if (task.status === 0) {
            const { tNpc } = grand;
            // 判断任务是否为对话型，且对话npc就是自身，并且坐标一致,直接完成任务
            task.status = type === TASK_TYPE.duiHua && !tNpc ? 2 : 1;
            TaskG.updataTaskGlobal(req, res, taskType, { [taskId]: task });
            // 返回任务信息
            if (task.status === 2) {
                res.send({
                    code: 0,
                    data: taskFn.getTaskSceneInfo(req, res, task),
                    message
                })
                return
            }
            // 传送至目标怪物或者npc
            taskFn.taskTp(req, res, task);
            return;
        }

        // 完成任务
        if (task.status === 1 || task.status === 2) {
            const speed = taskFn.speedTask(req, res, task);
            task.status = speed.done ? 2 : 1;
            TaskG.updataTaskGlobal(req, res, taskType, { [taskId]: task });
        }
        // 进行中，传送至任务目标
        if (task.status === 1) {
            grandFn.tpDirUpdate(req, res);
            return;
        }
        let message = undefined;
        // 完成任务
        if (task.status === 2) {
            // 获取任务奖励
            message = taskFn.getTaskReward(req, res, reward);
            if (!message) {
                // 收集任务，扣除背包物品
                if (type === 3) {
                    knapsackFn.deleteKnapsack(req, res, { article: { ...complete.article, ...complete.equip } });
                }
                // 更新为已完成状态
                task.status = 3;
            }
        }
        // 任务已完成，传送至下个任务坐标
        if (task.status === 3) {
            // 完成任务将任务从已领取队列中删除
            TaskG.deleteTaskGlobal(req, res, taskType, task.id);
            // 完成任务后判断是否有下个任务,有则加入可领取任务,并且传送目标地
            const { nextId } = task;
            if (nextId) {
                const { grand } = taskFn.createTask(req, res, taskType, nextId)[nextId];;
                grandFn.tpDirUpdate(req, res, grand.npc.address)
            } else {
                res.send({
                    code: 0,
                    data: {
                        endText: '暂无更多任务！',
                    }
                })
            }
            return
        }
        res.send({
            code: 0,
            data: taskFn.getTaskSceneInfo(req, res, task),
            message
        })
    }
}
