const { TaskSystem } = require('@/system');
const { TaskG, DailysG } = require('@/global');
const { taskFn } = require('@/utils');
const { DAIL_TYPE_LIST, TASK_TYPE_TEXT_MEUN, TASK_TYPE_MEUN } = TaskSystem;
module.exports = {
    /**
     * 获取任务列表
     * @param {*} req.type 任务类型默认main(mian:主线,exp:每日经验,tael:每日金钱,world:每日声望)
     */
    getTaskList: function (req, res) {
        const { type = TASK_TYPE_MEUN.main } = req.body;
        const role = RoleG.getRoleGlobal(req, res);
        const { dailyTask } = DailysG.getDailysGlobal(req, res);
        let tasks = TaskG.getTaskGlobal(req, res, type);
        let message = '';
        // 判断是否为每日任务且未领取同类型任务
        if (DAIL_TYPE_LIST.includes(type) && !tasks) {
            if (dailyTask[type] <= 0) {
                message = `${TASK_TYPE_TEXT_MEUN[type]}已经达到领取上限。`;
            } else {
                const taskID = TaskSystem.randomDailyTaskId();
                const task = TaskSystem.analyTask(req,res,taskID, type, role);
                task.status = 1;
                tasks = { [taskID]: task };
                // 加入任务队列
                TaskG.updataTaskGlobal(req, res, type, tasks);
                // 每日任务减-1
                dailyTask[type]--;
                DailysG.updataDailysGlobal(req, res, { dailyTask });

            }

        }
        // 主线任务文案
        const mains = type !== TASK_TYPE_MEUN.main ? (TaskG.getTaskGlobal(req, res, TASK_TYPE_MEUN.main) || {}) : tasks;
        const taskList = [{
            text: `${TASK_TYPE_TEXT_MEUN[TASK_TYPE_MEUN.main]}(${Object.values(mains).length})`,
            type: TASK_TYPE_MEUN.main
        }];



        // 每日任务文案
        DAIL_TYPE_LIST.forEach((type) => {
            taskList.push({
                text: `${TASK_TYPE_TEXT_MEUN[type]}(${dailyTask[type]})`,
                type: type
            })
        })
        // Object.keys(dailyTask).forEach(key => {
        //     taskList.push({
        //         text: `${TASK_TYPE_TEXT_MEUN[key]}(${dailyTask[key]})`,
        //         type: Number(key)
        //     })
        // })

        const copys = TaskG.getTaskGlobal(req, res, TASK_TYPE_MEUN.copy) || {};
        const copyLen = Object.values(copys).filter(({ status }) => status).length;
        if (copyLen) {
            taskList.push({
                text: `${TASK_TYPE_TEXT_MEUN[TASK_TYPE_MEUN.copy]}(${copyLen})`,
                type: TASK_TYPE_MEUN.copy
            })
        }
        const task = {};
        Object.keys(tasks || {}).forEach((taskId) => {
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
                dailyTask,
                tasks
            },
        })

    }
}