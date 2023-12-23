
const { knapsackTable } = require('../../table');
const { KnapsackG } = require('../../global');
const { knapsackFn } = require('../../utils');


const ids = [1141, 1144, 13156, 13157, 13158, 13159, 13160, 13161, 13162, 13163, 13164, 13165, 13180, 13181,]
module.exports = {
    /**
     * 兑换物品
     * @param {*} req 
     * @param {*} res 
     * @param {*} req.id 物品id
     */
    shopIntegral: function (req, res) {
        const { id } = req.body;
        if (!id) {
            ErrorG.paramsError(res);
            return;
        }

        const { name, integral } = knapsackTable.getArticle(id);
        if (!integral) {
            res.send({
                code: 0,
                message: '兑换物品异常'
            })
            return;
        }
        const { role_integral } = RoleG.getRoleGlobal(req, res);
        const { data } = KnapsackG.getknapsackGlobal(req, res);
        if (data.length >= KnapsackG.KNAPSACK_SIZE) {
            res.send({
                code: 0,
                message: '背包已满,请先清理物品。'
            })
            return;
        }

        if (!role_integral.shenZhuang || integral > role_integral.shenZhuang) {
            res.send({
                code: 0,
                message: '积分不足,兑换失败'
            })
            return;
        }
        const article = {
            [id]: {
                id,
                name,
                s: 1
            }
        };

        const message = knapsackFn.addKnapsack(req, res, article, { data });
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
            success: `消耗${integral}积分,成功兑换${name}`
        })
    }
}
