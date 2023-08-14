const { getRoleGlobal } = require('../roleG/getRoleGlobal');
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
        return {
            exp: taskNum,
            tael: taskNum,
            world: taskNum,
            exploit: exploitNum,
            gang: socialize_pool.gang ? 8 : -1,
            intersect: socialize_pool.intersect ? 8 : -1,
        }
    }
}