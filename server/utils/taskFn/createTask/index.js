const { RoleG } = require('../../../global');
const { TaskTable } = require('../../../table');
const { getDailyReward } = require('./getDailyReward');
const { getReward } = require('./getReward');
const { getGrand } = require('./getGrand');
const { getComplete } = require('./getComplete');
const { TASK_TYPE_MEUN } = TaskTable;
// 每日任务
const DAIL_TYPE_YLIST = [TASK_TYPE_MEUN.exp, TASK_TYPE_MEUN.world, TASK_TYPE_MEUN.tael];

module.exports = {
    /**
     * 创建任务
     * @param {*} req 
     * @param {*} res 
     * @param {*} type mian:主线,exp:每日经验,tael:每日金钱,world:每日声望
     * @param {*} id 任务id
     */
    createTask: function (req, res, type, id) {
        const { role_level } = RoleG.getRoleGlobal(req, res);
        const task = TaskTable.getTask(req, res, type, id);
        let reward = undefined;
        // 每日任务奖励解析
        if (DAIL_TYPE_YLIST.includes(type)) {
            reward = getDailyReward(type, role_level);
        }
        // 主线任务奖励解析
        if (type === TASK_TYPE_MEUN.main) {
            reward = getReward(task.reward);
        }
        task.reward = reward;
        const { grand, complete } = task;
        // 地图解析
        if (grand) {
            task.grand = getGrand(grand);
        }
        // 完成条件解析
        if (complete) {
            task.complete = getComplete(complete);
        }
        return task;
    },
}