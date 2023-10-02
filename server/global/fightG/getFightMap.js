const { FIGHT_MAP_Global, FIGHT_INFO_Global } = require('./config');

module.exports = {
    /**
     * 获取全局战斗Map信息池
     * @param role_id
     * @returns fightMap.id 战斗池信息Id|玩家对战则是对方role_id
     * @returns fightMap.state 战斗状态(0:战斗中,1:胜利,2:失败)
     * @returns fightMap.type 战斗类型战斗类型(1:玩家VS人机,2:多玩家VS人机家,3:切磋,4:击杀)
     * @returns fightMap.template 敌人模版{id:(role_id,怪物id),num:对方数量}
     * @returns fightMap.results 战斗结果(奖励信息)
     * @returns fightMap.player 我的信息
     * @returns fightMap.roundAttr 战斗属性{role:自身,rival:对方属性,pet:宠物属性}
     * @returns fightMap.roundText 回合文案{dps:造成伤害,pet_dps:宠物伤害,drain_life:消耗生命,drain_mana:法力消耗,restore_life:恢复生命,restore_mana:恢复法力}
     * @returns fightMap.intervalTime 出招时间,玩家pk使用
     */
    getFightMap: function (role_id) {
        return FIGHT_MAP_Global[role_id] ? JSON.parse(JSON.stringify(FIGHT_MAP_Global[role_id])) : undefined;

    }

}
