
const { PAI_MAI_HANG_Global, OUT_TIME } = require('./config');
module.exports = {
    /**
     * 创建全局拍卖物品
     * @param {*} req 
     * @param {*} res 
     * @param {*} info 物品信 息
     * @param {*} price 价格
     * @returns message 错误信息
     */
    setPaimaiHang: function (req, res, info, price) {
        if (PAI_MAI_HANG_Global.length >= 20) {
            return {
                message: '拍卖行已达最大拍卖数量。'
            }
        }
        const { role_id, role_name } = RoleG.getRoleGlobal(req, res);
        const unx = new Date() * 1;
        const id_p = `${unx}_${info.id}_${role_id}`;
        const data = {
            info,
            role_name, // 拍卖人名称
            role_id, // 拍卖人id
            price, // 拍卖价格
            id_p, // 唯一标识(上架时间戳_物品id_拍卖人id)
            out_timer: unx + OUT_TIME
        };
        PAI_MAI_HANG_Global.push(data);
        return { id_p };
    }
}