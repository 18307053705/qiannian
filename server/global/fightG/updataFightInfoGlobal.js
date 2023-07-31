const { FIGHT_MAP_Global, FIGHT_INFO_Global } = require('./config');
const roleG = require('../roleG');


module.exports = {
    /**
     * 更新全局战斗信息池
     * @param {*} req 
     * @param {*} res 
     * @param {*} data:需更新的战斗信息
     */
    updataFightInfoGlobal: function (req, res, data) {
        const { role_id } = roleG.getRoleGlobal(req, res);
        const { id } = FIGHT_MAP_Global[role_id];
        if (id) {
            FIGHT_INFO_Global[fightId] = {
                ...FIGHT_INFO_Global[fightId],
                ...data,
            }
        }
    }

}