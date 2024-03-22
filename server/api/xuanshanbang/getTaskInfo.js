const { TaskG } = require('@/global');
const { taskFn } = require('@/utils');
const { TASK_TYPE_MEUN } = TaskG;
module.exports = {
    /**
     * 获取任务信息
     * @param {*} req.id 任务id
     */
    getTaskInfo: function (req, res) {
        const { id } = req.body;
        const tasks = TaskG.getTaskGlobal(req, res, TASK_TYPE_MEUN.copy) || {};

        const task = tasks[id];
        if (task) {
            task.complete = taskFn.speedTask(req, res, task);
        }
        const { status, complete } = task || { status: 0 };
        res.send({
            code: 0,
            data: {
                status,
                complete,
            },
        })
    }
}
