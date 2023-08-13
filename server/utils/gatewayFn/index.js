
const { checkLogin } = require('./checkLogin');
const { roleCheck } = require('./roleCheck');
const { roleFightCheck } = require('./roleFightCheck');
module.exports = {
    /**
     * 网关验证
     * @param {*} req 
     * @param {*} res 
     * @returns true 通过
     */
    checkGateway: function (req, res) {
        // 验证登录态
        if (!checkLogin(req, res)) {
            return;
        }
        // 验证角色态
        if (!roleCheck(req, res)) {
            return;
        }
        // 判断角色是否处于战斗状态
        if (!roleFightCheck(req, res)) {
            return;
        }
        return true;
    }

}