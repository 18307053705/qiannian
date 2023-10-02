const { FightG, GrandG, RoleG } = require("../../../global");
const { creatFreak } = require("./creatFreak");
const { creatPlayer } = require("./creatPlayer");
const { creatRank } = require("./creatRank");
// const { checkContinueFight } = require("./checkContinueFight");

module.exports = {
  /**
   * 创建战斗
   * @param req
   * @param res
   * @param fightType 战斗类型 1:人机 2:玩家切磋,3:玩家死斗
   * @param data.continueDir 点击继续发起的创建
   * @returns fightMap 战斗信息
   * @returns fightInfo 战斗具体信息
   */
  creatFight: function (req, res, fightType,continueDir) {
    const { fightMap } = FightG.getFightGlobal(req, res);
    // 战斗中
    if (fightMap && !continueDir) {
      return;
    }
    const { currentDir } = GrandG.getDirGlobal(req, res);
    const { rank } = currentDir;
    const players = creatPlayer(req, res);
    // 单人vs人机
    if (fightType === 1 && !rank) {
      const { rivals, template } = creatFreak(req, res);
      // 创建化全局战斗
      const { role_id } = RoleG.getRoleGlobal(req, res);
      const fightMap = {
        id: role_id,
        type: 1,
        player:players.completePlayer,
        template,
        state: 0,
      };
      // 创建化全局战斗信息
      const fightInfo = {
        rivals: rivals,
        players: [players.simplePlayer],
        buffs: {},
        template,
      };
      console.log(fightInfo,'fightInfo...')
      FightG.setFightGlobal(req, res, fightMap, fightInfo);
      return;
    }
    // 多人vs人机
    if (fightType === 1 && rank) {
      return creatRank(req, res, players);
    }

    // 创建玩家切磋
    if (fightType === 2) {
    }
    // 创建玩家死斗
    if (fightType === 3) {
    }
  },
};
