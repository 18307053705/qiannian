const { FIGHT_MAP_Global, FIGHT_INFO_Global } = require('./config');
const roleG = require('../roleG');
module.exports = {
    /**
     * 设置全局战斗信息池
     * @param {*} req 
     * @param {*} res 
     * @param {*} fightMap.type 战斗类型(1:玩家VS人机,2:多玩家VS人机家,3:切磋,4:击杀)
     * @param {*} fightMap.rivalMold 敌人原型信息
     * @param {*} fightMap.num 敌人数量
     * @param {*} fightMap.isContinue 是否可继续战斗
     * @param {*} fightMap.player 我的信息
     * @param {*} fightInfo.rivals 对手信息
     * @param {*} fightInfo.players 队友信息
     * @param {*} fightInfo.buffs buff信息
     * @param {*} roleId 角色id,玩家之间的战斗使用
     */
    setFightGlobal: function (req, res, fightMap, fightInfo, roleId) {
        const { role_id } = roleId ? { role_id: roleId } : roleG.getRoleGlobal(req, res);
        // 生成唯一战斗id
        const fightId = new Date() * 1 + role_id;
        const fightMaps = {
            id: fightId, // 生成唯一战斗id
            state: 0,
            results: {},
            ...fightMap
        };
        FIGHT_MAP_Global[role_id] = fightMaps;
        FIGHT_INFO_Global[fightMaps.id] = fightInfo;
        return {
            fightInfo,
            fightMap: fightMaps
        }
    }

}