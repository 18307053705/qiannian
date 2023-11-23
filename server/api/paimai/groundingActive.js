
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
        const { uid, price } = req.body;
        if (!price || !uid) {
            ErrorG.paramsError(res);
            return;
        }
        const { data } = KnapsackG.getknapsackGlobal(req, res);
        const in_x = data.findIndex((itme) => itme.uid === uid);
        // 验证物品信息
        if (!data[in_x]) {
            res.send({
                code: 0,
                message: '物品信息有误'
            })
            return;
        }
        const { id, name, ext } = data[in_x];
        const info = {
            id,
            name,
            s: 1,
            ext
        }
        const { message, id_p } = PaiMaiHangG.setPaimaiHang(req, res, info, price);
        if (!message) {
            knapsackFn.deleteKnapsack(req, res, { [id]: info }, data);
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