const { DAILYS_Global } = require('./config');
const { getRoleGlobal } = require('../roleG/getRoleGlobal');
const { initDailyTask } = require('../taskG/initDailyTask');

module.exports = {
    /**
     * 初始化每日全局,每日首次登录初始化一次
     * 
     * @param {*} req 
     * @param {*} res
     */
    initDailysGlobal: function (req, res) {
        const { role_id } = getRoleGlobal(req, res);
        if (!DAILYS_Global[role_id]) {
            DAILYS_Global[role_id] = {
                ...initDailyTask(req,res),
                fw: 10,
                xz: 10,
                hb: 10,
                lp: 10,
                shenYuan: { s: 1, l: 0 },
                xiuLian: { s: 1, l: 0 },
            }
        }
    }
}