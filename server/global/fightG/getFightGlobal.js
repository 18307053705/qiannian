const { FIGHT_ID_Global, FIGHT_INFO_Global } = require('./config');
const roleG = require('../roleG');


module.exports = {
    /**
     * 获取全局战斗信息池
     * @param {*} req 
     * @param {*} res 
     * @returns {*} fightId:战斗池信息id
     * @returns {*} fightInfo:战斗信息
     * @returns {*} fightInfo.id: 战斗池信息id
     * @returns {*} fightInfo.type:1-玩家 VS 人机  2-玩家 VS 玩家 3-多玩家 VS 人机
     * @returns {*} fightInfo.rival:对方信息[]
     * @returns {*} fightInfo.player:我方信息[]
     * @returns {*} fightInfo.buffs:buff信息
     * @returns {*} fightInfo.rivalMold:敌人原型信息
     */
    getFightGlobal: function (req, res) {
        const { role_id } = roleG.getRoleGlobal(req, res);
        const fightId = FIGHT_ID_Global[role_id];
        if (fightId) {
            return {
                fightInfo: JSON.parse(JSON.stringify(FIGHT_INFO_Global[fightId])),
                fightId
            }
        }
        return {};
    }

}