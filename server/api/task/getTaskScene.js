
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
        // 角色等级不足
        if (task.level > role_level) {
            res.send({
                code: 0,
                data: {
                    noLevel: true,
                    level: task.level
                }
            })
            return;
        }
        res.send({
            code: 0,
            data: {
                ...task,
                npc: dir.currentDir,
                role_level
            }
        })
    }
}