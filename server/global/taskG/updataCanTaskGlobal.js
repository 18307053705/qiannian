const { getRoleGlobal } = require('../roleG/getRoleGlobal');
const { CAN_TASKS_Global } = require('./config');

module.exports = {
    /**
     * 更新全局未接任务信息
     * @param {*} req 
     * @param {*} res
     * @param {*} type mian:主线,exp:每日经验,tael:每日金钱,world:每日声望
     * @param {*} taks {id:{taks}}
     */
    updataCanTaskGlobal: function (req, res, type, taks) {
        const { role_id } = getRoleGlobal(req, res);
        let tasks = CAN_TASKS_Global[role_id];
        if (!tasks) {
            tasks = {};
        }
        if (!tasks[type]) {
            tasks[type] = {};
        }
        tasks = {
            ...tasks[type],
            ...taks
        }
        CAN_TASKS_Global[role_id] = tasks;
        return JSON.parse(JSON.stringify(tasks[type]));
    }
}