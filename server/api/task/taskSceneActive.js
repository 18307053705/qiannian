const { TaskSystem } = require('@/system');
const { GrandG, TaskG } = require('@/global');
const { taskFn, grandFn } = require('@/utils');
const { TASK_STATU, TASK_TYPE } = TaskSystem;

// 任务状态: 0：未领取 1：已领取 2：未完成 3：可完成 4:已完成
module.exports = {
    /**
     * 任务场景操作
     */
    taskSceneActive: function (req, res) {
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
        // 初始任务状态
        const oldStatus = task.status;
        // 接任务 
        if (task.status === TASK_STATU.wait) {
            task.status = TASK_STATU.wait_complete;
            // 判断领取任务类型是否：战斗 | 收集
            // 是直接返回地图
            if (task.type === TASK_TYPE.zhandou || task.type === TASK_TYPE.shouji) {
                // 更新任务信息
                TaskG.updataTaskGlobal(req, res, taskType, { [taskId]: task });
                grandFn.backGrand(req, res);
                return;
            }
        }

        // 未完成与可完成可互相改变
        if (task.status === TASK_STATU.wait_complete || task.status === TASK_STATU.can_complete) {
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
            // 已完成
            task.status = TASK_STATU.finished;
            // 创建下一个任务
            if (task.nextId) {
                const nextTask = taskFn.analyTask(req, res, task.nextId, taskType);
                TaskG.updataTaskGlobal(req, res, taskType, { [task.nextId]: nextTask });
            }
        }
        // 更新任务信息
        TaskG.updataTaskGlobal(req, res, taskType, { [taskId]: task });

        // 对话任务当前状态未完成直接传送到对话目标NPC
        if (task.status === TASK_STATU.wait_complete && task.type === TASK_TYPE.duihau) {
            const { tNpc } = task.grand;
            tNpc ? grandFn.tpDirUpdate(req, res, tNpc.address) : grandFn.backGrand(req, res);
            return;
        }

        // 任务初始状态未领取 或 未完成 直接返回任务场景
        if (oldStatus === TASK_STATU.wait || TASK_STATU.finished !== task.status) {
            res.send({
                code: 0,
                data: taskFn.getTaskScene(req, res, task),
            })
            return;
        }

        // 判断是否拥有下个任务
        if (!task.nextId) {
            res.send({
                code: 0,
                data: {
                    endText: '暂无更多任务！',
                }
            })
            return;
        }
        // 判断下个任务npc是否为当前npc
        // 是 直接返回任务场景领取信息并替换当前指令信息
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
        // 否 传送至领取任务npc位置
        grandFn.tpDirUpdate(req, res, nextNpc.address);

    }
}
