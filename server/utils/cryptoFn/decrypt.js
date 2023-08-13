const crypto = require("crypto");
const { genkey } = require('./genkey');
module.exports = {
    /**
     * 解密
     * @param {*} encryp 加密字符串
     * @param {*} iv 加密iv
     * @param {*} key 加密key
     */
    decrypt: function (encryp, iv, key) {
        const decipher = crypto.createDecipheriv(
            "aes-256-cbc",
            genkey(iv),
            genkey(key, 16)
        );
        let content = decipher.update(encryp, "hex", "utf8");
        content += decipher.final("utf8");
        return content;
    }
};
