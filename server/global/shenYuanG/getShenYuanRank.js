
const { SHNEYUAN_Global } = require('./config');
module.exports = {
    /**
     * 获取深渊信息排名信息
     * @param {*} req 
     * @param {*} res 
     * @returns list 深渊信息列表
     * @returns role_id 自身id
     */
    getShenYuanRank: function (req, res) {
        const { role_id, role_level } = RoleG.getRoleGlobal(req, res);
        const list = Object.values(SHNEYUAN_Global);
        return {
            list,
            role_id,
            role_level
        }
    }
}