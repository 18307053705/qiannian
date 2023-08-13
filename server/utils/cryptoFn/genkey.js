const crypto = require("crypto");
module.exports = {
    /**
     * 获取加密key
     * @param {*} secret 字符
     * @param {*} lenght  字符长度默认32
     */
    genkey: function (secret, lenght = 32) {
        return crypto
            .createHash("sha256")
            .update(String(secret))
            .digest("base64")
            .substr(0, lenght);
    }
};
