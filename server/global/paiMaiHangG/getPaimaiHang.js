
const { PAI_MAI_HANG_Global } = require('./config');
module.exports = {
    /**
     * 获取全局拍卖物品
     * @param {*} req 
     * @param {*} res 
     * @param {*} id_p
     * @return {*} info 物品信息
     * @return {*} srole_name 拍卖人名称
     * @return {*} srole_id 拍卖人id
     * @return {*} sprice  拍卖价格
     * @return {*} sid_p 唯一标识(上架时间戳_物品id_拍卖人id)
     * @return {*} soffer_id 出价人id，没有代表流拍
     * @return {*} out_timer 过期时间戳,
     */
    getPaimaiHang: function (req, res, idP) {
        return PAI_MAI_HANG_Global.find(({ id_p }) => id_p === idP)
    }
}