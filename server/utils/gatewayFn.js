const tokenFn = require("./tokenFn");
const { RoleG } = require("../global");
// 无需网关验证的请求
const whiteApiList = [
  "/api/user/login",
  "/api/user/register",
  "/api/meun/getMeunList"
];
// 无需角色验证的请求
const roleApiList = [
  "/api/role/roleLogin",
  "/api/role/getRoleList",
  "/api/role/createRole",
];
// 网关验证
module.exports = {
  checkApi: function (req) {
    if (whiteApiList.includes(req.originalUrl)) {
      return true;
    }
    // 验证登录态
    const token = req.cookies["token"];
    const user = req.cookies["q_uid"];
    const pass = req.cookies["q_m"];
    return token && user && pass && tokenFn.analysToken(token, user, pass);
  },
  // 角色验证
  roleCheck: function (req, res) {
    if ([...whiteApiList, ...roleApiList].includes(req.originalUrl)) {
      return true;
    }
    return RoleG.getRoleGlobal(req, res);

  }
};
