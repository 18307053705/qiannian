
const { SHNEYUAN_Global } = require('./config');
const { getRoleGlobal } = require('../roleG/getRoleGlobal');
module.exports = {
    /**
     * 初始化深渊信息
     * @param {*} req 
     * @param {*} res 
     */
    setShenYuan: function (req, res) {
        const { role_id, role_name, role_career, role_level } = getRoleGlobal(req, res);
        if (!SHNEYUAN_Global[role_id] && role_level >= 50) {
            SHNEYUAN_Global[role_id] = {
                s: 5,
                l: 1,
                id: role_id,
                n: role_name,
                level: role_level,
                career: role_career,
            }
        }
    }
}