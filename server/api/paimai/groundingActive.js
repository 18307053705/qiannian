
const { PaiMaiHangG, KnapsackG, ErrorG } = require('../../global');
const { knapsackFn } = require('../../utils');
const { updateTimer } = require('../../global/paiMaiHangG/updateTimer');
module.exports = {
    /**
     * 上架拍卖品
     * @param {*} req 
     * @param {*} rse 
     * @param {*} req.in_x 上架物品下标
     * @param {*} req.price 上架物品价格
     */
    groundingActive: function (req, res) {
        const { in_x, price } = req.body;
        if (!price) {
            ErrorG.paramsError(res);
            return;
        }
        const { data } = KnapsackG.getknapsackGlobal(req, res);

        // 验证物品信息
        if (!data[in_x]) {
            res.send({
                code: 0,
                message: '物品信息有误'
            })
            return;
        }
        const { id, p, n, ext } = data[in_x];
        const info = {
            id,
            p,
            n,
            s: 1,
            ext
        }
        const { message, id_p } = PaiMaiHangG.setPaimaiHang(req, res, info, price);
        if (!message) {
            knapsackFn.deleteKnapsack(req, res, { article: { [id]: info }, data });
            updateTimer(req, res, id_p);
        }
        res.send({
            code: 0,
            message,
            success: message || '上架成功',
            path: '/paiMaiHang'
        })
    }
}