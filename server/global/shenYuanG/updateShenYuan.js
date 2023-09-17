
const { SHNEYUAN_Global } = require('./config');
const { getRoleGlobal } = require('../roleG/getRoleGlobal');
module.exports = {
    /**
     * 更新深渊信息
     * @param {*} req 
     * @param {*} res 
     * @param {*} update 需要更新的深渊信息
     * @param {*} roleId 对方id
     */
    updateShenYuan: function (req, res, update, roleId) {
        const { role_id } = roleId ? { role_id: roleId } : getRoleGlobal(req, res);
        const shenyuan = JSON.parse(JSON.stringify(update));
        SHNEYUAN_Global[role_id] = {
            ...SHNEYUAN_Global[role_id],
            ...shenyuan
        }
    }
}