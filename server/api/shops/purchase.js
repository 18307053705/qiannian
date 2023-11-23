
const { knapsackTable } = require('@/table');
const { ErrorG, KnapsackG } = require('@/global');
const { knapsackFn } = require('@/utils');

module.exports = {
    /**
     * 购买商城物品
     * @param {*} req 
     * @param {*} res 
     * @param {*} req.id 物品id
     * @param {*} req.s 物品数量
     */
    purchase: function (req, res) {
        const { id, s } = req.body;
        const { price, unit, name } = knapsackTable.getArticle(id);
        if (!unit) {
            ErrorG.paramsError(res);
            return;
        }
        const { yuanbao, tael, data } = KnapsackG.getknapsackGlobal(req, res);
        if (data.length >= KnapsackG.KNAPSACK_SIZE) {
            res.send({
                code: 0,
                message: '背包已满,请先清理物品。'
            })
            return;
        }
        const drain = s * price;
        const updata = {};
        let message = '';
        if (unit === 'yuanbao') {
            message = drain > yuanbao ? '元宝不足' : ''
            updata['yuanbao'] = yuanbao - drain;
        }
        if (unit === 'tael') {
            message = drain > tael ? '银两不足' : '';
            updata['tael'] = tael - drain;
        }
        // 判断金钱是否足够
        if (message) {
            res.send({
                code: 0,
                message
            })
            return;
        }
        const article = {
            [id]: {
                id,
                name,
                s
            }
        };
        message = knapsackFn.addKnapsack(req, res, article);
        if (message) {
            res.send({
                code: 0,
                message
            })
            return;
        }
        KnapsackG.updateknapsackGlobal(req, res, updata)
        res.send({
            code: 0,
            success: `花费${drain}${unit === 'tael' ? '银两' : '元宝'},购买${name}`
        })
    }
}
