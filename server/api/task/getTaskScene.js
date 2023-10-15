
const { GrandG, TaskG, RoleG } = require('../../global');
const { taskFn } = require('../../utils');
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
        // 不存在任务
        if (!task) {
            return {
                endText: '暂无更多任务！',
            };
        }
        if (task.level > role_level) {
            return {
                levelText: `等级不足${level},先去升级吧！`,
            };
        }
        if (task.status === 1 || task.status === 2) {
            const speed = taskFn.speedTask(req, res, task);
            task.status = speed.done ? 2 : 1;
            TaskG.updataTaskGlobal(req, res, taskType, { [taskId]: task });
        }

        res.send({
            code: 0,
            data: taskFn.getTaskSceneInfo(req, res, tasks[taskId])
        })
    }
}