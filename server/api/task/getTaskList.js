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
        const mains = TaskG.getTaskGlobal(req, res, TASK_TYPE_MEUN.main) || {};
        const taskList = [{
            text: `${TASK_TYPE_TEXT_MEUN[TASK_TYPE_MEUN.main]}(${Object.values(mains).length})`,
            type: TASK_TYPE_MEUN.main
        }];
        Object.keys(daitys).forEach((key) => {
            // 判断是否为副本
            const text = TASK_TYPE_TEXT_MEUN[TASK_TYPE_MEUN[key] || -1]
            if (text && daitys[key] !== -1) {
                taskList.push({
                    text: `${text}(${daitys[key]})`,
                    type: TASK_TYPE_MEUN[key]
                })
            }
        })
        const copys = TaskG.getTaskGlobal(req, res, TASK_TYPE_MEUN.copy) || {};
        const copyLen = Object.values(copys).filter(({ status }) => status).length;
        if (copyLen) {
            taskList.push({
                text: `${TASK_TYPE_TEXT_MEUN[TASK_TYPE_MEUN.copy]}(${copyLen})`,
                type: TASK_TYPE_MEUN.copy
            })
        }
        const task = {};
        Object.keys(tasks).forEach((taskId) => {
            task[taskId] = {
                ...taskFn.getTaskSceneInfo(req, res, tasks[taskId]),
                taskType: type
            };

        })
        res.send({
            code: 0,
            message,
            data: {
                taskList,
                task,
                DAIL_TYPE_LIST,
                tasks
            },
        })

    }
}