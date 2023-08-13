const { DAILYS_Global } = require('./config');
const { getRoleGlobal } = require('../roleG/getRoleGlobal');

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
                exp: 8,
                money: 8,
                world: 8,
                gang: 8,
                intersect: 8,
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