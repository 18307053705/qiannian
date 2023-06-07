var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/runoob";
 
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("数据库已创建!");
  db.close();
});

const express = require("express");
require("express-async-errors");
const cookieParser = require("cookie-parser");
const gatewayFn = require("./utils/gatewayFn");
const errorFn = require("./utils/errorFn");
const globalFn = require("./utils/globalFn");
const Global = require("./global");

// // 十分钟时间戳
const time = 600000;
// const time = 5000;
// 定时清楚长时间不访问的角色全局空间
setInterval(() => {
  const roleLoop = Global.roleLoop;
  Object.keys(roleLoop).forEach(user => {
    const role = roleLoop[user];
    // 超过十分钟不访问的角色,释放对应全局空间
    if (new Date() * 1 - role.time > time) {
      globalFn.roleExit('', '', user);
    }
  })

}, time)

const app = express();
// post请求处理
app.use(express.json());
// cookie
app.use(cookieParser());
// 请求网关验证
app.use("*", function (req, res, next) {
  // 验证登录态
  if (!gatewayFn.checkApi(req)) {
    errorFn.error(res, 100000);
    return;
  }
  // 
  // console.log('验证前:',req.originalUrl)
  if (!gatewayFn.roleCheck(req)) {
    // console.log('验证不通过:',req.originalUrl)
    errorFn.error(res, errorFn.ERR_MEUN.ROLE);
    return;
  }
  // console.log('验证通过:',req.originalUrl)
  // 更新角色访问时间
  Global.updateRoleTime(req);
  next();
});
// 请求路由
app.use("/api/user", require("./api/user"));
app.use("/api/role", require("./api/role"));
app.use("/api/meun", require("./api/meun"));
app.use("/api/dir", require("./api/dir"));
app.use("/api/fight", require("./api/fight"));
app.use("/api/knapsack", require("./api/knapsack"));
app.use("/api/player", require("./api/player"));
app.use("/api/friends", require("./api/friends"));
app.use("/api/socialize", require("./api/socialize"));
app.use("/api/shopping", require("./api/shopping"));

// 全局捕获异常
app.use(errorFn.globalError);

app.listen(3000, function () {
  console.log("服务启动:127.0.0.1:3000");
});

