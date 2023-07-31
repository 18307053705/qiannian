const { FIGHT_MAP_Global, FIGHT_INFO_Global } = require('./config');
const roleG = require('../roleG');


//          id:idstate:战斗状态(0:战斗中,1:胜利,2:失败)
//          type:战斗类型(1:玩家VS人机,2:玩家VS玩家,3:多玩家VS玩家人机)
//          rivalMold:敌人原型信息
//          results: 战斗结果(奖励信息)

module.exports = {
    /**
     * 获取全局战斗信息池
     * @param {*} req 
     * @param {*} res 
     * @returns {*} fightMap.id 战斗池信息Id
     * @returns {*} fightMap.state战斗状态(0:战斗中,1:胜利,2:失败)
     * @returns {*} fightMap.type战斗类型(1:玩家VS人机,2:玩家VS玩家,3:多玩家VS玩家人机)
     * @returns {*} fightMap.rivalMold:敌人原型信息
     * @returns {*} fightMap.results:战斗结果(奖励信息)
     * @returns {*} fightMap.player:我的信息
     * @returns {*} fightInfo.rival:对方信息[]
     * @returns {*} fightInfo.players:队友信息[]
     * @returns {*} fightInfo.buffs:buff信息
     */
    getFightGlobal: function (req, res) {
        const { role_id } = roleG.getRoleGlobal(req, res);
        const fightMap = FIGHT_MAP_Global[role_id];
        if (fightMap) {
            return {
                fightInfo: JSON.parse(JSON.stringify(FIGHT_INFO_Global[fightMap.id])),
                fightMap: JSON.parse(JSON.stringify(fightMap)),
            }
        }
        return {};
    }

}