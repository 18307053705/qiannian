
const { knapsackTable } = require('../../table');
const { ErrorG, RoleG, KnapsackG } = require('../../global');
const { knapsackFn } = require('../../utils');

module.exports = {
    /**
     * 兑换物品
     * @param {*} req 
     * @param {*} res 
     * @param {*} req.id 物品id
     * @param {*} req.p 兑换类型
     */
    shopIntegral: function (req, res) {
        const { id, p } = req.body;

        if (!id || !p) {
            ErrorG.paramsError(res);
            return;
        }

        const { name, n, integral } = p === 3 ? knapsackTable.getEquip(id) : knapsackTable.getArticle(id);
        const { role_integral } = RoleG.getRoleGlobal(req, res);
        const { data } = KnapsackG.getknapsackGlobal(req, res);
        if (data.length >= KnapsackG.KNAPSACK_SIZE) {
            res.send({
                code: 0,
                message: '背包已满,请先清理物品。'
            })
            return;
        }
        if (integral > role_integral.shenZhuang) {
            res.send({
                code: 0,
                message: '积分不足,兑换失败'
            })
            return;
        }
        const article = {};
        if (p === 3) {
            article['equipReward'] = {
                [id]: {
                    id,
                    p,
                    n: name,
                    s: 1
                }
            }

        } else {
            article['artReward'] = {
                [id]: {
                    id,
                    p,
                    n,
                    s: 1
                }
            }
        }


       const message = knapsackFn.addKnapsack(req, res, { article, data });
        if (message) {
            res.send({
                code: 0,
                message
            })
            return;
        }
        // 减去对应积分
        role_integral.shenZhuang -= integral;
        RoleG.updataRoleGlobal(req, res, { role_integral });
        res.send({
            code: 0,
            success: '兑换成功'
        })
    }
}
