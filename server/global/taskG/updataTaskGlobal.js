
const { TASKS_Global } = require('./config');

module.exports = {
    /**
     * 更新全局已接任务信息
     * @param {*} req 
     * @param {*} res
     * @param {*} type mian:主线,exp:每日经验,tael:每日金钱,world:每日声望
     * @param {*} taks {id:{taks}}
     */
    updataTaskGlobal: function (req, res, type, taks) {
        const { role_id } = RoleG.getRoleGlobal(req, res);
        const tasks = TASKS_Global[role_id] || {};
        if (!tasks[type]) {
            tasks[type] = {};
        }
        tasks[type] = {
            ...tasks[type],
            ...taks
        }
        TASKS_Global[role_id] = tasks;
        return JSON.parse(JSON.stringify(tasks[type]));
    }
}