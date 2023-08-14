const { getRoleGlobal } = require('../roleG/getRoleGlobal');
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
        const { role_id } = getRoleGlobal(req, res);
        if (!TASKS_Global[role_id]) {
            TASKS_Global[role_id] = {};
        }
        if (!TASKS_Global[role_id][type]) {
            TASKS_Global[role_id][type] = {};
        }
        TASKS_Global[role_id][type] = {
            ...TASKS_Global[role_id][type],
            ...taks
        }
        return JSON.parse(JSON.stringify(TASKS_Global[role_id][type]));
    }
}