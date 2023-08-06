const { ErrorG, KnapsackG } = require("../../global");
const { shopFn } = require("../../utils");
module.exports = {
    /**
     * 修改店铺名称
     * @param {*} req.name
     */
    modify: async function (req, res) {
        const { name } = req.body;
        if (!name) {
            ErrorG.paramsError(res);
            return;
        }
        const { results } = await mysql.asyncQuery(`select * from shop where name="${name}"`);
        if (results[0]) {
            res.send({
                code: 0,
                message: '店铺名重复!'
            })
            return;
        }
        const { tael } = KnapsackG.getknapsackGlobal(req, res);
        if (tael < 500000) {
            res.send({
                code: 0,
                message: '银两不足500000'
            })
            return;
        }

        await shopFn.updataShopInfo(req, res, { name });
        KnapsackG.updateknapsackGlobal(req, res, { tael: tael - 500000 });
        const data = await shopFn.getShopInfo(req, res);
        res.send({
            code: 0,
            data: data
        })
    }
}

