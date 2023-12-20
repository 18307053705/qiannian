const { TaskSystem } = require('@/system');
const { getRoleGlobal } = require('../roleG/getRoleGlobal');

const { TASK_TYPE_MEUN } = TaskSystem;

module.exports = {
    /**
     * 初始化每日任务数量
     * @param {*} req 
     * @param {*} res 
     */
    initDailyTask: function (req, res) {
        const { role_level, socialize_pool } = getRoleGlobal(req, res);
        let exploitNum = -1;
        let taskNum = 8;
        if (role_level > 65) {
            taskNum = 12;
        }
        if (role_level > 74) {
            exploitNum = 8;
            taskNum = 15;
        }
        // 处理副本任务
        const copyTask = {};
        Object.keys(TaskSystem.getCopyTackAll()).forEach((id) => {
            copyTask[id] = 2;
        })
        return {
            dailyTask: {
                [TASK_TYPE_MEUN.exp]: taskNum,
                [TASK_TYPE_MEUN.tael]: taskNum,
                [TASK_TYPE_MEUN.world]: taskNum,
                [TASK_TYPE_MEUN.exploit]: taskNum,
                [TASK_TYPE_MEUN.gang]: taskNum,
                [TASK_TYPE_MEUN.intersect]: taskNum
            },
            copyTask,
        }
    }
}