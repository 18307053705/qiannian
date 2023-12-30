const { FIGHT_INFO_Global, FIGHT_RANK_INFO_Global } = require("./config");
module.exports = {
  /**
   * 获取全局战斗信息池
   * @param req
   * @param res
   * @param role_id 可选参数,用于判断其他人是否在战斗中
   * @returns fightInfo.id 战斗池信息Id|玩家对战则是对方role_id
   * @returns fightInfo.state 战斗状态(0:战斗中,1:胜利,2:失败,3:逃跑)
   * @returns fightInfo.type 战斗类型战斗类型(1:玩家VS人机,2:多玩家VS人机家,3:切磋,4:击杀)
   * @returns fightInfo.template 敌人模版{id:(role_id,怪物id),num:对方数量}
   * @returns fightInfo.results 战斗结果(奖励信息)
   * @returns fightInfo.player 我的信息
   * @returns fightInfo.roundAttr 战斗属性{role:自身,rival:对方属性,pet:宠物属性}
   * @returns fightInfo.roundText 回合文案{dps:造成伤害,pet_dps:宠物伤害,drain_life:消耗生命,drain_mana:法力消耗,restore_life:恢复生命,restore_mana:恢复法力}
   * @returns fightInfo.intervalTime 出招时间,玩家pk使用
   * @returns fightInfo.reward 奖励信息,用于判断是否领取过奖励
   * @returns fightInfo.update 是否更新过人物属性，避免重复更新
   *
   * @returns fightRankInfo.id 战斗池ID
   * @returns fightRankInfo.rivals 对方信息[]
   * @returns fightRankInfo.players 队友信息[]
   * @returns fightRankInfo.buffs buff信息
   * @returns fightRankInfo.template 敌人模版{id: (role_id, 怪物id), num: 对方数量}
   */
  getFightGlobal: function (req, res, role_id) {
    const role = role_id ? { role_id } : RoleG.getRoleGlobal(req, res);
    const fightInfo = FIGHT_INFO_Global[role?.role_id];
    if (fightInfo) {
      const fightRankInfo = FIGHT_RANK_INFO_Global[fightInfo?.id]
      return JSON.parse(JSON.stringify({
        fightInfo,
        fightRankInfo
      }))
    }
    return undefined;
  },
};
