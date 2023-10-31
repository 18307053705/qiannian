const { FightG, GrandG } = require("../../../global");
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
    const { FIGHT_TYPE } = FightG;
    const { fightMap } = FightG.getFightGlobal(req, res);
    const { currentDir } = GrandG.getDirGlobal(req, res);
    const fightType = getFightType(req, res);
    const { num } = currentDir;
    // 人机校验
    const isPve = (fightType === FIGHT_TYPE.pve || fightType === FIGHT_TYPE.rank) && num !== -1 && num === 0;
    // 存在战斗 战斗状态为战斗中 且非刷怪    
    if (fightMap && fightMap.state === 0 && !iscContinue) {
      return;
    }
    if (isPve) {
      return;
    }
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
