
const { ErrorG } = require('../../global')
module.exports = {
    /**
     * 验证物品信息
     * @param {*} req 
     * @param {*} res 
     * @param {*} data 
     * @returns {boolean} true代表验证未通过
     */
    chekeArticle: function (req, res, data) {
        const { in_x = 0, s = 1, type } = req.body;
        if (!type) {
            ErrorG.paramsError(res);
            return true;
        }
        const itme = data[in_x];
        if (!itme) {
            res.send({
                code: 0,
                message: '物品信息有误'
            })
            return true;
        }
        if (itme.s < s) {
            res.send({
                code: 0,
                message: '物品数量不足'
            })
            return true;
        }
        return false;
    }
}