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
     * @param {*} data.callback 回调函数接收生成的task,操作这个taks会改变全局task
     * @returns tasks {id:task}
     */
    createTask: function (req, res, type, id, { callback } = {}) {
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
        // 副本任务奖励解析
        if (type === TASK_TYPE_MEUN.copy) {
            reward = getReward(task.reward);
        }
        task.reward = reward;
        const { grand, complete } = task;
        // 地图解析
        if (grand) {
            getGrand(grand, type, id);
        }
        // 完成条件解析
        if (complete || grand.freak) {     
            task.complete = getComplete(complete, grand);
        }

        task.taskType = type;
        task.status = 0;
        const tasks = { [id]: task };
        callback && callback(task);
        // 加入全局任务列表
        TaskG.updataTaskGlobal(req, res, type, tasks);
        return JSON.parse(JSON.stringify(tasks));
    },
}