
const { knapsackTable } = require('../../table');

module.exports = {
    /**
     * 获取可兑换物品列表
     * @param {*} req 
     * @param {*} res
     */
    getIntegralList: function (req, res) {
        const list = [];
        Object.values(knapsackTable.getArticleListAll(1)).forEach(({ id, integral, type, n }) => {
            if (integral) {
                list.push({
                    id,
                    integral,
                    type,
                    name: n
                })
            }
        })
        Object.values(knapsackTable.getArticleListAll(2)).forEach(({ id, integral, type, name }) => {
            if (integral) {
                list.push({
                    id,
                    integral,
                    type,
                    name
                })
            }
        })
        res.send({
            code: 0,
            data: list
        })
    }
}
