const { RoleG, TaskG } = require('../../../global');
const { TaskTable } = require('../../../table');
const { getDailyReward } = require('./getDailyReward');
const { getReward } = require('./getReward');
const { getGrand } = require('./getGrand');
const { getComplete } = require('./getComplete');
const { TASK_TYPE_MEUN, DAIL_TYPE_LIST } = TaskG;
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
        if (DAIL_TYPE_LIST.includes(type)) {
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
            getGrand(grand, type, id);
        }
        // 完成条件解析
        if (complete) {
            task.complete = getComplete(complete);
        }
        return {
            ...task,
            taskType: type
        };
    },
}