const { FightG, GrandG } = require("@/global");
const { creatRank } = require("./creatRank");
const { creatPve } = require("./creatPve");
const { creatPlayerFight } = require("./creatPlayerFight");
const { FIGHT_TYPE_EUNM } = FightG;
module.exports = {
  /**
   * 创建战斗
   * @param req
   * @param res
   * @param iscContinue 是否刷怪
   */
  creatFight: function (req, res) {
    const { currentDir } = GrandG.getDirGlobal(req, res);
    const { rank, role_id, type } = currentDir;
    // 计算战斗类型
    const fightType = role_id ? type : (rank ? FIGHT_TYPE_EUNM.rank : FIGHT_TYPE_EUNM.pve);
    // 单人vs人机
    if (fightType === FIGHT_TYPE_EUNM.pve) {
      return creatPve(req, res);
    }
    // 多人vs人机
    if (fightType === FIGHT_TYPE_EUNM.rank) {
      return creatRank(req, res);
    }
    // 创建玩家 切磋|死斗
    return creatPlayerFight(req, res);
  },
};
