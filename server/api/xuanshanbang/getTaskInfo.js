const { TaskG } = require('@/global');
const { TASK_TYPE_MEUN } = TaskG;
module.exports = {
    /**
     * 获取任务信息
     * @param {*} req.id 任务id
     */
    getTaskInfo: function (req, res) {
        const { id } = req.body;
        const task = TaskG.getTaskGlobal(req, res, TASK_TYPE_MEUN.copy) || {};
        const { status, complete } = task[id] || { status: 0 };
        res.send({
            code: 0,
            data: {
                status,
                complete
            },
        })
    }
}
