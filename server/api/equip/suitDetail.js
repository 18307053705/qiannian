const { ErrorG } = require('../../global');
const { knapsackTable } = require('../../table');

module.exports = {
    /**
     * 套装详情
     * @param req.id 套装id
     */
    suitDetail: (req, res) => {
        const { id } = req.body;
        if (!id) {
            ErrorG.paramsError(res);
            return;
        }
        const { fn, ...suit } = knapsackTable.getSuit(id);
        const list = [];
        if (suit.type === 1) {
            list.push(fn(suit, 3))
            list.push(fn(suit, 5))
        } else {
            list.push(fn(suit, 2))
        }

        res.send({
            code: 0,
            data: list
        })
    }
};
