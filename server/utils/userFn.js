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
      errorFn.error(res, 1000002, "账号需要9-12位数字或字母组成");
      return false
    }
    if (!reg.test(pass)) {
      errorFn.error(res, 1000002, "密码需要9-12位数字或字母组成");
      return false
    }
    return true;
  }
};
