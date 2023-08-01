const { FIGHT_MAP_Global } = require('./config');
const roleG = require('../roleG');


module.exports = {
    /**
     * 更新全局战斗信息池
     * @param {*} req 
     * @param {*} res 
     * @param {*} fightMap.state 战斗状态(0:战斗中,1:胜利,2:失败)
     * @param {*} fightMap.type 战斗类型(1:玩家VS人机,2:玩家VS玩家,3:多玩家VS玩家人机)
     * @param {*} fightMap.rivalMold 敌人原型信息
     * @param {*} fightMap.num 敌人数量
     * @param {*} fightMap.isContinue 是否可继续战斗
     * @param {*} fightMap.player 我的信息
     * @returns {*} fightMap
     */
    updataFightMapGlobal: function (req, res, data) {
        const { role_id } = roleG.getRoleGlobal(req, res);
        const fightMap = FIGHT_MAP_Global[role_id];
        const newFightMap = {
            ...fightMap,
            ...data
        }
        FIGHT_MAP_Global[role_id] = newFightMap;
        return JSON.parse(JSON.stringify(newFightMap));
    }

}