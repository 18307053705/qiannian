
const { knapsackTable } = require('@/table');

module.exports = {
    /**
     * 获取铁匠铺装备列表
     * @param {*} req 
     * @param {*} res
     */
    getEquipList: function (req, res) {
        const list = [];
        knapsackTable.getAllEquipList().forEach(({ id, price, unit, name }) => {
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
