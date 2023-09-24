
const { knapsackTable } = require('../../table');

module.exports = {
    /**
     * 获取铁匠铺装备列表
     * @param {*} req 
     * @param {*} res
     */
    getequipList: function (req, res) {
        const list = [];
        Object.values(knapsackTable.getArticleListAll(2)).forEach(({ id, price, unit, name }) => {
            if (price) {
                list.push({
                    id,
                    price,
                    unit,
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
