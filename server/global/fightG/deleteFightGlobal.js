const { FIGHT_INFO_Global, FIGHT_RANK_INFO_Global, FIGHT_TYPE_EUNM } = require("./config");
module.exports = {
  /**
   * 删除战斗信息
   * @param req
   * @param res
   */
  deleteFightGlobal: function (req, res) {
    const role = RoleG.getRoleGlobal(req, res);
    const fightInfo = FIGHT_INFO_Global[role?.role_id];
    // 组队任务需删除组队信息池
    if (fightInfo.type === FIGHT_TYPE_EUNM.rank) {
      delete FIGHT_RANK_INFO_Global[fightInfo?.id]
    }
    delete FIGHT_MAP_Global[role_id];
  },
};
