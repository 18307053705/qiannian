const { FIGHT_INFO_Global } = require('./config');
const roleG = require('../roleG');


module.exports = {
    /**
     * 删除全局战斗信息池
     * @param {*} req 
     * @param {*} res
     */
    deleteFightInfoGlobal: function (req, res) {
        const { role_id } = roleG.getRoleGlobal(req, res);
        delete FIGHT_INFO_Global[role_id];
    }

}