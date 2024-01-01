const { FIGHT_INFO_Global, FIGHT_RANK_INFO_Global } = require("./config");
module.exports = {
  /**
   * 删除战斗信息
   * @param req
   * @param res
   */
  deleteFightGlobal: function (req, res) {
    const role = RoleG.getRoleGlobal(req, res);
    delete FIGHT_INFO_Global[role?.role_id];
  },
  /**
   * 删除组队战斗信息
   * @param fightID 战斗ID
   */
  deleteFightRankGlobal: function (fightID) {
    delete FIGHT_RANK_INFO_Global[fightID];
  }
};
