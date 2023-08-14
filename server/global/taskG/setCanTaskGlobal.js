const { getRoleGlobal } = require('../roleG/getRoleGlobal');
const { CAN_TASKS_Global } = require('./config');

module.exports = {
    /**
     * 设置全局未接任务信息
     * @param {*} req 
     * @param {*} res 
     */
    setCanTaskGlobal: function (req, res, taks) {
        const { role_id } = getRoleGlobal(req, res);
        // 存在则不再设置
        if (CAN_TASKS_Global[role_id]) {
            return;
        }
        CAN_TASKS_Global[role_id] = JSON.parse(JSON.stringify(taks));
    }
}