const { FightG } = require("../../global");
const { fightFn, fightsFn } = require("../../utils");

module.exports = {
  /**
   * 创建战斗
   */
  creatFight: (req, res) => {
    fightsFn.creatFight(req, res, 1);

    const { fightInfo, fightMap } = FightG.getFightGlobal(req, res);
    res.send({
      code: 0,
      data: {
        fightInfo,
        fightMap,
      },
    });
  },
};
