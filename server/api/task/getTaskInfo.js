
const { ErrorG } = require('../../global');
const { taskFn } = require('../../utils');
module.exports = {
    /**
     * 获取任务信息
     * @param {*} req.type 任务类型 mian:主线,exp:每日经验,tael:每日金钱,world:每日声望
     */
    getTaskInfo: function (req, res) {
        const { type } = req.body;
        if (!type) {
            ErrorG.paramsError(res);
            return;
        }
        const { message, task } = taskFn.getTaskInfo(req, res, type);

        res.send({
            code: 0,
            message,
            data: task
        })
    }
}