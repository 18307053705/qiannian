
const { PAI_MAI_HANG_Global } = require('./config');
module.exports = {
    /**
     * 获取全局拍卖物品
     * @param {*} req 
     * @param {*} res 
     * @param {*} id_p
     */
    getPaimaiAll: function () {
        return JSON.parse(JSON.stringify(PAI_MAI_HANG_Global));
    }
}