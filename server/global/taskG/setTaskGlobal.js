const { getRoleGlobal } = require('../roleG/getRoleGlobal');
const { TASKS_Global } = require('./config');

module.exports = {
    /**
     * 设置全局已接任务信息
     * @param {*} req 
     * @param {*} res 
     */
    setTaskGlobal: function (req, res, taks) {
        const { role_id } = getRoleGlobal(req, res);
        // 存在则不再设置
        if (TASKS_Global[role_id]) {
            return;
        }
        TASKS_Global[role_id] = JSON.parse(JSON.stringify(taks));
    }
}