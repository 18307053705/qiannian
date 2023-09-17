
const { knapsackFn, roleFn, qingyuanFn } = require('../../../utils');
const { knapsackTable } = require('../../../table');
const { RoleG } = require('../../../global');
module.exports = {
    /**
  * 获取任务奖励
  * @param {*} req 
  * @param {*} res 
  * @param {*} fun 
  * @param {*} freak 
  */
    getReward: function (req, res, fun, freak) {
        if (fun === 'qingYuan1') {
            const { type, n, id } = knapsackTable.getArticle(311);
            const article = {
                artReward: {
                    [id]: {
                        n,
                        id,
                        p: type,
                        s: 1
                    }
                }
            }
            const message = knapsackFn.addKnapsack(req, res, { article });
            if (message) {
                return message;
            }
            // 增加角色经验
            roleFn.computeRoleLevel(req, res, 100000);
            // 增加姻缘树经验
            qingyuanFn.computeTerrLevel(req, res, 10);
            return;
        }
        if (fun === 'gang1') {
            const { role_integral } = RoleG.getRoleGlobal(req, res);
            // 增加角色经验
            roleFn.computeRoleLevel(req, res, 500000, (_, updata) => {
                updata['role_integral'] = {
                    ...role_integral,
                    shenZhuang: (role_integral['shenZhuang'] || 0) + 1
                }
            });
            return;
        }
    }

}