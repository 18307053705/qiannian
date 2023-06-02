// const os = require('os');
const crypto = require("crypto");
function genkey(secret, lenght = 32) {
  return crypto
    .createHash("sha256")
    .update(String(secret))
    .digest("base64")
    .substr(0, lenght);
}

module.exports = {
  encryption: function(content, iv, key) {
    const cipher = crypto.createCipheriv(
      "aes-256-cbc",
      genkey(iv),
      genkey(key, 16)
    );
    let encryp = cipher.update(content, "utf8", "hex"); // 输入数据编码为hex(16进制)，输出为utf8
    encryp += cipher.final("hex");
    return encryp;
  },
  decrypt: function(encryp, iv, key) {
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
