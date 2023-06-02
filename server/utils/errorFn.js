const ERR_MEUN = {
  STATE: 100000,
  SERVEr: 100001,
  VERIF: 100002,
  SEARCH: 100003,
  REGISTER: 100004,
  LOGIN: 100005,
  ROLE: 100006,
  DIR: 100007,
};
const ERROR_TYPE = {
  100000: "登录态异常,请重新登录!",
  100001: "服务器异常!",
  100002: "验证错误!",
  100003: "查询异常!",
  100004: "注册失败:账号或者该设备重复注册。",
  100005: "登录失败:账号或密码有误。",
  100006: "角色信息异常。",
  100007: "指令异常",
};

module.exports = {
  ERR_MEUN,
  globalError: function (err, req, res, next) {
    console.log(err)
    if (err) {
      const [code, message] = typeof err === 'string' ? err.split("|") : [err, ''];
      res.json({
        code,
        message: message || ERROR_TYPE[code] || "未知错误"
      });
    }
    next()
  },
  /**
   *
   * @param {
   *  100000: "登录异常,请重新登录!",
   *  100001: "服务器异常!",
   *  100002: "验证错误!",
   *  100003: "查询异常!",
   *  100004: "注册失败:账号或者该设备重复注册。",
   *  100005: "登录失败:账号或密码有误。"
   *  100006: "角色信息异常。",
   *  100007: "指令异常",
   */
  error: function (res, code, message) {
    res.json({
      code,
      message: message || ERROR_TYPE[code] || "未知错误"
    })
  }
};
