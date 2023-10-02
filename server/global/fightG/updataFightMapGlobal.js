const { FIGHT_MAP_Global } = require('./config');
const roleG = require('../roleG');


module.exports = {
    /**
     * 更新全局战斗信息池
     * @param req 
     * @param res 
     * @param fightMap.id 战斗池信息Id|玩家对战则是对方role_id
     * @param fightMap.state 战斗状态(0:战斗中,1:胜利,2:失败)
     * @param fightMap.type 战斗类型战斗类型(1:玩家VS人机,2:多玩家VS人机家,3:切磋,4:击杀)
     * @param fightMap.template 敌人模版{id:(role_id,怪物id),num:对方数量}
     * @param fightMap.results 战斗结果(奖励信息)
     * @param fightMap.player 我的信息
     * @param fightMap.fightAttr 战斗属性{role:自身,rival:对方属性,pet:宠物属性}
     * @param fightMap.intervalTime 出招时间,玩家pk使用
     * @returns fightMap
     */
    updataFightMapGlobal: function (req, res, data, roleId) {
        const { role_id } = roleId ? { role_id: roleId } : roleG.getRoleGlobal(req, res);
        const fightMap = FIGHT_MAP_Global[role_id];
        const newFightMap = {
            ...fightMap,
            ...data
        }
        FIGHT_MAP_Global[role_id] = newFightMap;
        // return JSON.parse(JSON.stringify(newFightMap));
    }

}