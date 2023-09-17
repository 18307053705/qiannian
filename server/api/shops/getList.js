
const { knapsackTable } = require('../../table');

module.exports = {
    getList: function (_, res) {
        const data = [];
        Object.values(knapsackTable.getArticleListAll()).forEach(({ id, price, unit, n, type }, in_x) => {
            unit && data.push({ price, unit, id, n, type, in_x });
        })
        res.send({
            code: 0,
            data
        })
    }
}
