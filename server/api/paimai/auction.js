
const { PaiMaiHangG, KnapsackG, ErrorG, RoleG } = require('../../global');
const { updateTimer } = require('../../global/paiMaiHangG/updateTimer');
const { knapsackFn } = require('../../utils');

module.exports = {
    /**
     * 竞价
     * @param {*} req 
     * @param {*} res 
     * @param {*} req.id_p 唯一标识
     * @param {*} req.price 竞拍价格
     */
    auction: async function (req, res) {
        const { id_p, price } = req.body;
        // 参数验证
        if (!price || !id_p || typeof price !== 'number') {
            ErrorG.paramsError(res);
            return;
        }
        const info = PaiMaiHangG.getPaimaiHang(req, res, id_p);
        if (!info) {
            res.send({
                code: 0,
                message: '竞拍物品信息有误'
            })
            return;
        }
        const { offer_id, price: oldPrice } = info;

        // 角色验证
        const { role_id } = RoleG.getRoleGlobal(req, res);
        if (info.role_id === role_id) {
            res.send({
                code: 0,
                message: '无法竞拍自己的物品'
            })
            return;
        }
        if (offer_id === role_id) {
            res.send({
                code: 0,
                message: '请勿重复出价'
            })
            return;
        }
        const { tael } = KnapsackG.getknapsackGlobal(req, res)
        if (tael < price) {
            res.send({
                code: 0,
                message: '竞价失败，银两不足'
            })
            return;
        }
        if (tael < oldPrice) {
            res.send({
                code: 0,
                message: `竞价失败，当前竞拍价格:${oldPrice}`
            })
            return;
        }
        // 判断是否存在上个竞拍者，存在则将其竞拍银两返回
        if (offer_id) {
            const { tael: taels } = await knapsackFn.getKnapsackInfo(req, res, { role_id: offer_id });
            knapsackFn.updateKnapsack(req, res, { tael: taels + oldPrice }, offer_id);
        }
        // 扣除自身银两
        KnapsackG.updateknapsackGlobal(req, res, { tael: tael - price });
        // 更新拍卖信息
        PaiMaiHangG.updataPaimaiHang(req, res, id_p, price);
        updateTimer(req, res, id_p);
        res.send({
            code: 0,
            data: PaiMaiHangG.getPaimaiAll()
        })
    }
}