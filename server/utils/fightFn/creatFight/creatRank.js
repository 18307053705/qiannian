const { FightG, GrandG } = require("@/global");
const { creatFreak } = require("./creatFreak");
const { creatPlayer } = require("./creatPlayer");
const { FIGHT_STATE_EUNM, FIGHT_TYPE_EUNM } = FightG;
module.exports = {
  /**
   * 创建组队战斗
   * @param req
   * @param res
   * @param players 玩家信息
   */
  creatRank: function (req, res) {
    const { role_id, socialize_pool, qingyuan } = RoleG.getRoleGlobal(req, res);
    const { ranks, gang } = socialize_pool;
    const { currentDir } = GrandG.getDirGlobal(req, res);
    // 计算玩家属性
    const players = creatPlayer(req, res);
    // 战斗id
    let fightId = role_id;
    // 情缘怪物
    if (currentDir.rank === 'qingyuan' && qingyuan.d) {
      fightId = `${qingyuan.d.id}_${currentDir.id}`
    }
    // 帮会怪物
    if (currentDir.rank === 'gang' && gang) {
      fightId = `${gang.id}_${currentDir.id}`
    }
    // 组队怪物
    if (currentDir.rank === 'ranks' && ranks) {
      fightId = `${ranks.id}_${currentDir.id}`
    }

    // 获取组队战斗信息
    let fightRankInfo = FightG.getFightRankGlobal(fightId);
    // 不存在则进行创建
    if (!fightRankInfo) {
      const { rivals, template } = creatFreak(req, res);
      fightRankInfo = {
        rivals: rivals,
        players: [],
        buffs: {},
        template,
      };
      FightG.setFightRankGlobal(fightId, fightRankInfo);
    }
    fightRankInfo.players.push(players.simplePlayer);
    const fightInfo = {
      id: fightId,
      type: FIGHT_TYPE_EUNM.rank,
      player: players.completePlayer,
      template: fightInfo.template,
      state: FIGHT_STATE_EUNM.inCombat,
    };
    FightG.setFightGlobal(req, res, fightInfo);
  },
};
