const { FIGHT_INFO_Global } = require("./config");

module.exports = {
  /**
   * 获取战斗信息
   * @param fightId fightId
   * @returns fightInfo|undefined
   * @returns fightInfo.id 战斗池ID
   * @returns fightInfo.rivals 对方信息[]
   * @returns fightInfo.players 队友信息[]
   * @returns fightInfo.buffs buff信息
   * @returns fightInfo.template 敌人模版{id: (role_id, 怪物id), num: 对方数量}
   */
  getFightInfo: function (fightId) {
    return FIGHT_INFO_Global[fightId]
      ? JSON.parse(JSON.stringify(FIGHT_INFO_Global[fightId]))
      : undefined;
  },
};
