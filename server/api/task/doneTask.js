
const { ErrorG, TaskG } = require('../../global');
const { taskFn } = require('../../utils');
module.exports = {
    /**
     * 完成任务
     * @param {*} req.id 任务id
     * @param {*} req.type 任务类型
     */
    doneTask: function (req, res) {
        const { id, type } = req.body;
        if (!id || !type) {
            ErrorG.paramsError(res);
            return;
        }
        const tasks = TaskG.getTaskGlobal(req, res, type);
        const task = tasks[id];
        if (!task) {
            res.send({
                code: 0,
                message: '任务信息有误'
            })
            return;
        }
        const speed = taskFn.speedTask(req, res, task.complete);
        if (!speed.done) {
            res.send({
                code: 0,
                message: '当前任务未完成'
            })
            return;
        }
        const message = taskFn.getTaskReward(req, res, task.reward);
        if (message) {
            res.send({
                code: 0,
                message
            })
            return;
        }
        TaskG.deleteTaskGlobal(req, res, type, id);
        res.send({
            code: 0,
            data: 'ok'
        })
    }
}