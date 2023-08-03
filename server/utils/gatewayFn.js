const tokenFn = require("./tokenFn");
const { RoleG, FightG } = require("../global");
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


// 无需验证战斗的请求
const roleFightApiList = [
  "/api/chat/get",
  "/api/fight/creatFight",
  "/api/fight/fightDir",
  "/api/fight/continue",
  "/api/fight/getFightConfig",
  "/api/fight/setFightConfig",
  "/api/player/playerFightDir",
  "/api/player/creatPlayerFight",
  "/api/player/exitFight",
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
  },
  // 判断是否处于战斗中
  roleFightCheck: function (req, res) {
    if (roleFightApiList.includes(req.originalUrl)) {
      return true;
    }
    const { fightMap } = FightG.getFightGlobal(req, res);
    if (fightMap) {
      console.log('走到这里了：',req.originalUrl)
      res.send({
        code: 0,
        path: (fightMap.state === 1 || fightMap.state === 2) ? "fight" : "playerFight"
      })
      return false
    }
    return true;
  }



};
