const { knapsackTable } = require('@/table');
module.exports = {
    /**
     * 获取可兑换物品列表
     * @param {*} req 
     * @param {*} res
     */
    getIntegralList: function (req, res) {
        const list = [];
        Object.values(knapsackTable.getArticleList()).forEach(({ id, integral, name }) => {
            if (integral) {
                list.push({
                    id,
                    integral,
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
