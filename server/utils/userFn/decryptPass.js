const { decrypt } = require("../cryptoFn/decrypt");
module.exports = {
    /**
     * 密码解密
     * @param {*} pass 加密密码
     * @returns pass 明文
     */
    decryptPass: function (enPass) {
        return decrypt(enPass, "pass_user", "pass_IP");
    }
};
