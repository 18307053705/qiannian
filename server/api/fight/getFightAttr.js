const { FightG } = require("@/global");
const { FIGHT_TYPE_EUNM } = FightG;
module.exports = {
  /**
   * 创建战斗
   */
  getFightAttr: (req, res) => {
    const { id } = req.body;
    const fight = FightG.getFightGlobal(req, res, id);
    if (!fight) {
      res.send({
        code: 0,
        message: '获取战斗信息失败'
      })
      return;
    }
    const { fightInfo, fightRankInfo } = fight;
    const { template } = fightInfo;
    // 组队战斗怪物信息储存在fightRankInfo
    const rival = fightInfo.type === FIGHT_TYPE_EUNM.rank ? fightRankInfo.rivals[0] : fightInfo.rivals[0];
    if (!id) {
      res.send({
        code: 0,
        data: {
          attr: rival.attr,
          name: rival.name,
          level: template.level
        }
      })
      return;
    }
    const { player } = fightInfo;
    res.send({
      code: 0,
      data: {
        attr: player.attr,
        name: player.name,
        level: player.level,
      }
    })
  },
};
