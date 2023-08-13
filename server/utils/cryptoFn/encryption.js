const crypto = require("crypto");
const { genkey } = require('./genkey');


module.exports = {
    /**
     * 加密
     * @param {*} content 加密内容
     * @param {*} iv 加密iv
     * @param {*} key 加密key
     */
    encryption: function (content, iv, key) {
        const cipher = crypto.createCipheriv(
            "aes-256-cbc",
            genkey(iv),
            genkey(key, 16)
        );
        let encryp = cipher.update(content, "utf8", "hex"); // 输入数据编码为hex(16进制)，输出为utf8
        encryp += cipher.final("hex");
        return encryp;
    }
};
