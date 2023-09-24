


const { KnapsackG, ErrorG } = require('../../global');

module.exports = {
    /**
     * 货币兑换
     * @param {*} req.type 兑换类型 1：元宝，2：银两
     * @param {*} req.num 兑换数量
     */
    exchange: function (req, res) {
        const { type, num } = req.body;
        if (!type || !num) {
            ErrorG.paramsError(res);
            return;
        }
        let { yuanbao, tael } = KnapsackG.getknapsackGlobal(req, res);

        const drain = type === 1 ? num * 70000 : null;
        // 兑换元宝校验
        if (type === 1 && drain > tael) {
            res.send({
                code: 0,
                message: `银两不足${drain},兑换元宝失败`
            })
            return;
        }
        // 兑换银两校验
        if (type === 2 && drain > yuanbao) {
            res.send({
                code: 0,
                message: `元宝不足${drain},兑换银两失败`
            })
            return;
        }
        let success = undefined;
        // 兑换元宝校验
        if (type === 1) {
            tael -= drain;
            yuanbao += num;
            success = `消耗${drain}银两,兑换${num}元宝`
        } else {
            yuanbao -= drain;
            tael += num * 50000;
            success = `消耗${num}元宝,兑换${num * 50000}银两`
        }
        KnapsackG.updateknapsackGlobal(req, res, { yuanbao, tael });
        res.send({
            code: 0,
            success
        })
    }
}
