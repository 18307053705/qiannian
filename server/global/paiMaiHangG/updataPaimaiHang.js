
const { PAI_MAI_HANG_Global, OUT_TIME } = require('./config');
module.exports = {
    /**
     * 更新全局拍卖物品
     * @param {*} req 
     * @param {*} res 
     * @param {*} id_p 唯一标识
     * @param {*} price 价格
     */
    updataPaimaiHang: function (req, res, idP, price) {
        const index = PAI_MAI_HANG_Global.findIndex(({ id_p }) => id_p === idP);
        const { role_id } = RoleG.getRoleGlobal(req, res);
        PAI_MAI_HANG_Global[index]['price'] = price;
        PAI_MAI_HANG_Global[index]['offer_id'] = role_id;
        PAI_MAI_HANG_Global[index]['out_timer'] = new Date() * 1 + OUT_TIME;
    }
}