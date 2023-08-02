const { SOCIALIZE_Global } = require('./config');
const roleG = require('../roleG');


module.exports = {
    /**
     * 获取全局势力信息
     * @param {*} req
     * @param {*} res
     * @param {*} key 势力key Textgang,intersect,ranks
     * @returns type 类型(1:帮会,2:庄园,3:队伍)
     * @returns line 在线人员{role_id(角色id):role_level(角色等级)}
     * @returns buff 势力buff{text:文案,value:{atk:10}值}
     * @returns num  在线人数
     */
    getSocializeGlobal: function (req, res, key) {
        const { socialize_pool } = roleG.getRoleGlobal(req, res);
        // 角色对应势力信息
        const sociInfo = socialize_pool[key];
        const keyName = `${sociInfo.id}_${key}`
        return SOCIALIZE_Global[keyName] || {};
    }

}