const express = require("express");
const mysql = require("../mysql");
const tokenFn = require("../utils/tokenFn");
const userFn = require("../utils/userFn");
const osFn = require("../utils/osFn");

const router = new express.Router();

router.post("/login", async (req, res) => {
  const { user, pass } = req.body;
  // 验证数据安全
  if (userFn.check(res, user, pass)) {
    return false;
  };
  const { results } = await mysql.asyncQuery(`select * from user  where user="${user}" and pass="${pass}"`);
  if (results[0]) {
    res.cookie("q_uid", user);
    res.cookie("token", tokenFn.creatToken(user, pass));
    res.cookie("q_m", userFn.creatPass(pass));
    return res.send({
      code: 0,
      data: "登录成功"
    });
  }
  res.send({
    code: 100005,
    data: "登录失败,账号或密码有误。"
  });
});

router.post("/register", async (req, res) => {
  const { user, pass } = req.body;
  // 验证数据安全
  if (userFn.check(res, user, pass)) {
    return false;
  };
  // const queryString = `select * from user  where user="${user}" or address="${IP}"`;
  const queryString = `select * from user  where user="${user}"`;
  const { results } = await mysql.asyncQuery(queryString);
  if (results[0]) {
    return res.send({
      code: 100005,
      data: "账号或者该设备重复注册。"
    });
  }
  // 注册账号
  const sqlAdd = "insert into user(user,pass,address) values(?,?,?)";
  const addDates = [user, pass, osFn.getIPAdress()];
  await mysql.asyncAdd(sqlAdd, addDates)
  res.cookie("q_uid", user);
  res.cookie("token", tokenFn.creatToken(user, pass));
  res.cookie("q_m", userFn.creatPass(pass));
  res.send({
    code: 0,
    data: "注册成功"
  });
});

module.exports = router;
