const { FightG } = require("../../../global");
const { creatRank } = require("./creatRank");
const { creatPve } = require("./creatPve");
const { getFightType } = require("./getFightType");
const { creatPlayerFight } = require("./creatPlayerFight");

module.exports = {
  /**
   * 创建战斗
   * @param req
   * @param res
   * @param iscContinue 是否刷怪
   */
  creatFight: function (req, res, iscContinue) {
    const { fightMap } = FightG.getFightGlobal(req, res);
    // 存在战斗 战斗状态为战斗中 且非刷怪 
    if (fightMap && fightMap !== 0 && !iscContinue) {
      return;
    }
    const fightType = getFightType(req, res);

    const { FIGHT_TYPE } = FightG;

    // 单人vs人机
    if (fightType === FIGHT_TYPE.pve) {
      return creatPve(req, res);
    }
    // 多人vs人机
    if (fightType === FIGHT_TYPE.rank) {
      return creatRank(req, res);
    }

    // 创建玩家 切磋|死斗
    if (fightType === FIGHT_TYPE.duel || fightType === FIGHT_TYPE.kill) {
      return creatPlayerFight(req, res)
    }
  },
};
