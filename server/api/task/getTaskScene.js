
const { GrandG, TaskG } = require('../../global');
module.exports = {
    /**
     * 获取任务场景信息
     */
    getTaskScene: function (req, res) {
        const { currentDir } = GrandG.getDirGlobal(req, res);
        const { taskId, taskType, isCan } = currentDir;

        let task = undefined;
        // 存在代表接任务,否则交任务
        if (isCan) {
            const canTasks = TaskG.getCanTaskGlobal(req, res, taskType);
            task = canTasks[taskId];
            TaskG.updataTaskGlobal(req, res, taskType, task);
            TaskG.deleteCanTaskGlobal(req, res, taskType, taskId);
        } else {
            const tasks = TaskG.getTaskGlobal(req, res, taskType);
            task = tasks[taskId]
        }


        res.send({
            code: 0,
            data: task
        })
    }
}