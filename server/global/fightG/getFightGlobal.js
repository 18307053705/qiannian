const { getFightInfo } = require("./getFightInfo");
const { getFightMap } = require("./getFightMap");
const roleG = require("../roleG");

module.exports = {
  /**
   * 获取全局战斗信息池
   * @param req
   * @param res
   * @param roleId 可选参数,用于判断其他人是否在战斗中
   * @returns fightMap.id 战斗池信息Id|玩家对战则是对方role_id
   * @returns fightMap.state 战斗状态(0:战斗中,1:胜利,2:失败)
   * @returns fightMap.type 战斗类型战斗类型(1:玩家VS人机,2:多玩家VS人机家,3:切磋,4:击杀)
   * @returns fightMap.template 敌人模版{id:(role_id,怪物id),num:对方数量}
   * @returns fightMap.results 战斗结果(奖励信息)
   * @returns fightMap.player 我的信息
   * @returns fightMap.roundAttr 战斗属性{role:自身,rival:对方属性,pet:宠物属性}
   * @returns fightMap.roundText 回合文案{dps:造成伤害,pet_dps:宠物伤害,drain_life:消耗生命,drain_mana:法力消耗,restore_life:恢复生命,restore_mana:恢复法力}
   * @returns fightMap.intervalTime 出招时间,玩家pk使用
   *
   * @returns fightInfo.id 战斗池ID
   * @returns fightInfo.rivals 对方信息[]
   * @returns fightInfo.players 队友信息[]
   * @returns fightInfo.buffs buff信息
   * @returns fightInfo.template 敌人模版{id: (role_id, 怪物id), num: 对方数量}
   */
  getFightGlobal: function (req, res, roleId) {
    const role = roleId ? { role_id: roleId } : roleG.getRoleGlobal(req, res);
    if (role) {
      const fightMap = getFightMap(role.role_id);
      return fightMap
        ? {
          fightMap: fightMap,
          fightInfo: getFightInfo(fightMap.id),
        }
        : {};
    }
    return {};
  },
};
