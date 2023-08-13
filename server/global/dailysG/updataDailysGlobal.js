const { DAILYS_Global } = require('./config');
const { getRoleGlobal } = require('../roleG/getRoleGlobal');

module.exports = {
    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @param {*} data 更新的数据
     */
    updataDailysGlobal: function (req, res, data) {
        const { role_id } = getRoleGlobal(req, res);
        const dailys = {
            ...DAILYS_Global[role_id],
            ...data
        }
        DAILYS_Global[role_id] = dailys;
        return JSON.parse(JSON.stringify(dailys));
    }
}