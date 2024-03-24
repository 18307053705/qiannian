
const { SHNEYUAN_Global } = require('./config');
module.exports = {
    /**
     * 初始化深渊信息
     * @param {*} req 
     * @param {*} res 
     */
    setShenYuan: function (req, res) {
        const { role_id, role_name, role_career, role_level } = RoleG.getRoleGlobal(req, res);
        if (!SHNEYUAN_Global[role_id] && role_level >= 50) {
            SHNEYUAN_Global[role_id] = {
                s: 5,
                l: 12,
                id: role_id,
                n: role_name,
                level: role_level,
                career: role_career,
            }
        }
    }
}