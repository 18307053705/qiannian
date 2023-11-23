
const { knapsackTable } = require('@/table');

module.exports = {
    getList: function (_, res) {
        const data = [];
        Object.values(knapsackTable.getArticleList()).forEach(({ id, price, unit, name }) => {
            unit && data.push({ price, unit, id, name });
        })
        res.send({
            code: 0,
            data
        })
    }
}
