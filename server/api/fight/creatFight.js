const { fightFn } = require("../../utils");

module.exports = {
  /**
   * 创建战斗
   */
  creatFight: (req, res) => {
    const { iscContinue } = req.body;
    // 检验是否可继续
    if (fightFn.creatFightCheck(req, res, iscContinue)) {
      return;
    }
    fightFn.creatFight(req, res, iscContinue);
    fightFn.getFightResults(req, res);
  },
};
