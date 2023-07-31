const { FIGHT_MAP_Global } = require('./config');
const roleG = require('../roleG');


module.exports = {
    /**
     * 删除全局战斗信息池
     * @param {*} req 
     * @param {*} res
     */
    deleteFightMapGlobal: function (req, res) {
        const { role_id } = roleG.getRoleGlobal(req, res);
        delete FIGHT_MAP_Global[role_id];
    }

}