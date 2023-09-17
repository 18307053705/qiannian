
const { SHNEYUAN_Global } = require('./config');
const { getRoleGlobal } = require('../roleG/getRoleGlobal');
module.exports = {
    /**
     * 获取深渊信息
     * @param {*} req 
     * @param {*} res 
     * @param {*} roleId 对方id
     * @returns shenyuan | undefined
     * @returns shenyuan.s 助人次数
     * @returns shenyuan.l 当前层数
     * @returns shenyuan.id 玩家Id
     * @returns shenyuan.n 玩家名称
     * @returns shenyuan.level 玩家等级
     * @returns shenyuan.career 玩家职业
     */
    getShenYuan: function (req, res, roleId) {
        const { role_id } = roleId ? { role_id: roleId } : getRoleGlobal(req, res);
        const shenyuan = SHNEYUAN_Global[role_id];
        return shenyuan ? JSON.parse(JSON.stringify(shenyuan)) : undefined;
    }
}