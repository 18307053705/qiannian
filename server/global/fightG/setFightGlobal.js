const { FIGHT_ID_Global, FIGHT_INFO_Global } = require('./config');
const roleG = require('../roleG');


module.exports = {
    /**
     * 设置全局战斗信息池
     * @param {*} req 
     * @param {*} res 
     * @param {*} fightInfo:战斗信息
     */
    setFightGlobal: function (req, res, fightInfo) {
        const { role_id } = roleG.getRoleGlobal(req, res);
        const fightId = FIGHT_ID_Global[role_id];
        if (!fightId) {
            FIGHT_ID_Global[role_id] = fightInfo;
            FIGHT_INFO_Global[role_id] = role_id;
        }
    }

}