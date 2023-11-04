const { getRoleGlobal } = require('../roleG/getRoleGlobal');
const copyTable = require('../../table/task/copy');
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
        // 处理副本任务
        const copyTask = {};
        Object.keys(copyTable).forEach((id) => {
            copyTask[id] = 2;
        })
        return {
            exp: taskNum,
            tael: taskNum,
            world: taskNum,
            exploit: exploitNum,
            gang: socialize_pool.gang ? 8 : -1,
            intersect: socialize_pool.intersect ? 8 : -1,
            copyTask,
            // lianHunDong: 2,
            // heiJiaoYu: 2,
            // siHailongGong: 2,
            // fengHuangTongMu: 2,
            // moShenChuanShuo: 2,
            // haiDiMoGong: 2,
            // tinaMoYiZhi: 2,
            // diFuChuanShuo: 2,
            // qunMoLuanWu: 2,
            // tianMoJIangLin: 2,
        }
    }
}