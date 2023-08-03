const { FIGHT_MAP_Global, FIGHT_INFO_Global } = require('./config');
const roleG = require('../roleG');

module.exports = {
    /**
     * 获取全局战斗信息池
     * @param {*} req 
     * @param {*} res 
     * @param {*} roleId 可选参数,用于判断其他人是否在战斗中
     * @returns {*} fightMap.id 战斗池信息Id
     * @returns {*} fightMap.state 战斗状态(0:战斗中,1:胜利,2:失败)
     * @returns {*} fightMap.type 战斗类型战斗类型(1:玩家VS人机,2:多玩家VS人机家,3:切磋,4:击杀)
     * @returns {*} fightMap.rivalMold 敌人原型信息
     * @returns {*} fightMap.num 敌人数量
     * @returns {*} fightMap.results 战斗结果(奖励信息)
     * @returns {*} fightMap.player 我的信息
     * @returns {*} fightMap.rivalId 怪物id
     * @returns {*} fightInfo.rivals 对方信息[]
     * @returns {*} fightInfo.players 队友信息[]
     * @returns {*} fightInfo.buffs buff信息
     */
    getFightGlobal: function (req, res, roleId) {
        const { role_id } = roleId ? { role_id: roleId } : roleG.getRoleGlobal(req, res);
        const fightMap = FIGHT_MAP_Global[role_id];
        if (fightMap) {
            const fightInfo = FIGHT_INFO_Global[fightMap.id];
            return {
                fightInfo: JSON.parse(JSON.stringify(fightInfo)),
                fightMap: JSON.parse(JSON.stringify(fightMap)),
            }
        }
        return {};
    }

}