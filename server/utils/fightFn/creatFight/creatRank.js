const { FightG, GrandG } = require("@/global");
const { creatFreak } = require("./creatFreak");
const { creatPlayer } = require("./creatPlayer");

module.exports = {
  /**
   * 创建组队战斗
   * @param req
   * @param res
   * @param players 玩家信息
   */
  creatRank: function (req, res) {
    const players = creatPlayer(req, res);
    const { role_id, socialize_pool, qingyuan } = RoleG.getRoleGlobal(req, res);
    const { ranks, gang } = socialize_pool;
    const { currentDir } = GrandG.getDirGlobal(req, res);
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
    // 判断是否存在组队战斗信息
    let fightInfo = FightG.getFightInfo(fightId);
    if (fightInfo) {
      fightInfo.players.push(players.simplePlayer);
    } else {
      // 否则创建战斗信息
      const { rivals, template } = creatFreak(req, res);
      fightInfo = {
        rivals: rivals,
        players: [players.simplePlayer],
        buffs: {},
        template,
      };
    }

    const fightMap = {
      id: fightId,
      type: 2,
      player: players.completePlayer,
      template: fightInfo.template,
      state: 0,
    };

    FightG.setFightGlobal(req, res, fightMap, fightInfo);
  },
};
