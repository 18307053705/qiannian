const { fightFn } = require("@/utils");
module.exports = {
  /**
   * 创建战斗
   */
  creatFight: (req, res) => {
    const { iscContinue } = req.body;
    // 检验是否可继续
    const { check, message } = fightFn.checkFightCreat(req, res, iscContinue);
    if (!check) {
      res.send({
        code: 0,
        message
      })
      return;
    }
    // 创建任务
    fightFn.creatFight(req, res, iscContinue);
    // 计算战斗结果
    fightFn.initRoundInfo(req, res);
    // 计算战斗结果
    fightFn.computeFightResults(req, res);
    // 返回战斗信息
    res.send({
      code: 0,
      data: {
        ...fightFn.getFightFormat(req, res)
      }
    })
  },
};
