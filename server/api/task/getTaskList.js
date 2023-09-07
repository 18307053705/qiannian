const { TaskG, DailysG } = require('../../global');
const { taskFn } = require('../../utils');
const { DAIL_TYPE_LIST, TASK_TYPE_TEXT_MEUN, TASK_TYPE_MEUN } = TaskG;
module.exports = {
    /**
     * 获取任务列表
     * @param {*} req.type 任务类型默认main(mian:主线,exp:每日经验,tael:每日金钱,world:每日声望)
     */
    getTaskList: function (req, res) {
        const { type = TASK_TYPE_MEUN.main } = req.body;
        const { tasks, message } = taskFn.getTasksInfo(req, res, type);
        const daitys = DailysG.getDailysGlobal(req, res);
        const taskList = [];
        Object.keys(daitys).forEach((key) => {
            const text = TASK_TYPE_TEXT_MEUN[TASK_TYPE_MEUN[key] || -1]
            if (text && daitys[key] !== -1) {
                taskList.push({
                    text: `${text}(${daitys[key]})`,
                    type: TASK_TYPE_MEUN[key]
                })
            }
        })
        res.send({
            code: 0,
            message,
            data: {
                taskList,
                task: tasks,
                DAIL_TYPE_LIST
            },
        })

    }
}