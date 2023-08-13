const { RoleG } = require('../../global');
const { knapsackTable } = require('../../table');
const { cornuconpiaFn, knapsackFn } = require('../../utils');
module.exports = {
    /**
     * 改变聚宝物品
     * @param {*} req 
     * @param {*} res 
     */
    chengId: function (req, res) {
        // 玄机符
        const article = {
            [308]: {
                ...knapsackTable.getArticle(308),
                s: 1
            }
        }
        const { message } = knapsackFn.deleteKnapsack(req, res, { article });
        if (message) {
            res.send({
                code: 0,
                message
            })
            return;
        }
        const { treasure_pool } = RoleG.getRoleGlobal(req, res);
        const { id, n } = cornuconpiaFn.getPrize(treasure_pool['jbp']);
        treasure_pool['jbp'].id = id;
        RoleG.updateRoleGlobal(req, res, { treasure_pool });
        res.send({
            code: 0,
            data: n
        })
    }
}