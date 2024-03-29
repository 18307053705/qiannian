const express = require("express");
require("express-async-errors");
const cookieParser = require("cookie-parser");
const gatewayFn = require("./utils/gatewayFn");
// const errorFn = require("./utils/errorFn");
// const globalFn = require("./utils/globalFn");
const mysql = require("./mysql");

// // 十分钟时间戳
// const time = 600000;
// // const time = 5000;
// // 定时清楚长时间不访问的角色全局空间
// setInterval(() => {
//   const roleGlobal = Global.roleGlobal;
//   Object.keys(roleGlobal).forEach(user => {
//     const role = roleGlobal[user];
//     // 超过十分钟不访问的角色,释放对应全局空间
//     if (new Date() * 1 - role.time > time) {
//       globalFn.roleExit('', '', user);
//     }
//   })

// }, time)

const app = express();
// post请求处理
app.use(express.json());
// cookie
app.use(cookieParser());

// 请求网关验证
app.use("*", async function (req, res, next) {
  // 网关验证
  if (!gatewayFn.checkGateway(req, res)) {
    return;
  }

  res.asyncQuery = mysql.asyncQuery;
  res.asyncAdd = mysql.asyncAdd;

  // console.log('验证通过:',req.originalUrl)
  // 更新角色访问时间
  // Global.updateRoleTime(req);
  next();
});
// 请求路由
app.use("/api/user", require("./api/user"));
app.use("/api/role", require("./api/role"));
app.use("/api/grand", require("./api/grand"));
app.use("/api/fight", require("./api/fight"));
app.use("/api/knapsack", require("./api/knapsack"));
app.use("/api/player", require("./api/player"));
app.use("/api/friends", require("./api/friends"));
app.use("/api/socialize", require("./api/socialize"));
app.use("/api/shopping", require("./api/shopping"));
app.use("/api/task", require("./api/task"));
app.use("/api/art", require("./api/art"));
app.use("/api/chat", require("./api/chat"));
app.use("/api/shops", require("./api/shops"));
app.use("/api/equip", require("./api/equip"));
app.use("/api/pet", require("./api/pet"));
app.use("/api/jackpot", require("./api/jackpot"));
app.use("/api/treasure", require("./api/treasure"));
app.use("/api/cornucopia", require("./api/cornucopia"));
app.use("/api/qingyuan", require("./api/qingyuan"));
app.use("/api/rankTask", require("./api/rankTask"));
app.use("/api/shenyuan", require("./api/shenyuan"));
app.use("/api/paimai", require("./api/paimai"));
app.use("/api/yinhang", require("./api/yinhang"));

// 全局捕获异常
app.use(function (err, req, res, next) {
  if (err) {
    console.log(err)
    res.json({
      code: 999999,
      message: err
    });
  }
  next()
});

app.listen(3000, function () {
  console.log("服务启动:127.0.0.1:3000");
});

