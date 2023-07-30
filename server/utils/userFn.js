var cryptoFn = require("./cryptoFn");
var errorFn = require("./errorFn");

module.exports = {
  creatPass: function (pass) {
    return cryptoFn.encryption(pass, "pass_user", "pass_IP");
  },
  analysPass: function (enPass) {
    return cryptoFn.decrypt(enPass, "pass_user", "pass_IP");
  },
  check: function (res, user, pass) {
    const reg = /^[A-Za-z0-9]{9,12}$/;
    if (!reg.test(user)) {
      return res.send({
        code: 1000005,
        data: "账号需要9-12位数字或字母组成"
      });
    }
    if (!reg.test(pass)) {
      return res.send({
        code: 1000005,
        data: "密码需要9-12位数字或字母组成"
      });
    }
    return false;
  }
};
