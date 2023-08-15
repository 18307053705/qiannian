const { getRoleGlobal } = require('../roleG/getRoleGlobal');
const { CAN_TASKS_Global } = require('./config');

module.exports = {
    /**
     * 删除全局未接任务信息
     * @param {*} req 
     * @param {*} res
     * @param {*} type mian:主线,exp:每日经验,tael:每日金钱,world:每日声望
     * @param {*} id 删除id
     */
    deleteCanTaskGlobal: function (req, res, type, id) {
        const { role_id } = getRoleGlobal(req, res);
        const tasks = CAN_TASKS_Global[role_id];
        if (!tasks || !tasks[type] || !tasks[type][id]) {
            return;
        }
        delete tasks[type][id];
        if(JSON.stringify(tasks[type]) === '{}'){
            delete tasks[type];
        }
    }
}