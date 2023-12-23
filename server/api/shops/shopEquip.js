const { knapsackTable } = require('@/table');
const { knapsackFn } = require('@/utils');

module.exports = {
    /**
     * 购买铁匠铺装备
     * @param {*} req.id 装备id
     */
    shopEquip: function (req, res) {
        const { id } = req.body;
        if (!id) {
            ErrorG.paramsError(res);
            return;
        }

        const { price, unit, name } = knapsackTable.getArticle(id);
        if (!unit) {
            res.send({
                code: 0,
                message: '装备信息有误'
            })
            return;
        }
        const { data, tael } = KnapsackG.getknapsackGlobal(req, res);
        if (tael < price) {
            res.send({
                code: 0,
                message: `银两不足${price},购买失败。`
            })
            return;
        }
        const article = {
            [id]: {
                id,
                s: 1,
                name,
            }
        }

        const message = knapsackFn.addKnapsack(req, res, article, { data });
        if (message) {
            res.send({
                code: 0,
                message
            })
            return;
        }
        KnapsackG.updateknapsackGlobal(req, res, { tael: tael - price });
        res.send({
            code: 0,
            success: `花费${price}银两成功购买${name}`
        })
    }
}
