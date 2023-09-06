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
            lianHunDong: role_level >= 30 ? 2 : 0,
            heiJiaoYu: role_level >= 40 ? 2 : 0,
            siHailongGong: role_level >= 50 ? 2 : 0,
            fengHuangTongMu: role_level >= 60 ? 2 : 0,
            moShenChuanShuo: role_level >= 70 ? 2 : 0,
            haiDiMoGong: role_level >= 80 ? 2 : 0,
            tinaMoYiZhi: role_level >= 90 ? 2 : 0,
            diFuChuanShuo: role_level >= 100 ? 2 : 0,
            qunMoLuanWu: role_level >= 100 ? 2 : 0,
            tianMoJIangLin: role_level >= 100 ? 2 : 0,
        }
    }
}