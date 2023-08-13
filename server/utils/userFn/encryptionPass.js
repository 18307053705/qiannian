const { encryption } = require("../cryptoFn/encryption");
module.exports = {
    /**
     * 密码加密
     * @param {*} pass 
     * @returns pass 加密
     */
    encryptionPass: function (pass) {
        return encryption(pass, "pass_user", "pass_IP");
    },
};
