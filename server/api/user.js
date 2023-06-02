const express = require("express");
const mysql = require("../mysql");
const tokenFn = require("../utils/tokenFn");
const userFn = require("../utils/userFn");
const errorFn = require("../utils/errorFn");
const osFn = require("../utils/osFn");

const router = new express.Router();

router.post("/login", (req, res) => {
  const { user, pass } = req.body;
  // 验证数据安全
  if (!userFn.check(res, user, pass)) {
    return false;
  };
  mysql.sqlQuery(
    `select * from user  where user="${user}" and pass="${pass}"`,
    results => {
      if (results[0]) {
        res.cookie("q_uid", user);
        res.cookie("token", tokenFn.creatToken(user, pass));
        res.cookie("q_m", userFn.creatPass(pass));
        res.send({
          code: 0,
          message: "登录成功"
        });
        return false;
      }
      errorFn.error(res, 100005);
    }
  );
});

router.post("/register", (req, res) => {
  const { user, pass } = req.body;
  // 验证数据安全
  if (!userFn.check(res, user, pass)) {
    return false;
  };
  // const queryString = `select * from user  where user="${user}" or address="${IP}"`;
  const queryString = `select * from user  where user="${user}"`;
  mysql.sqlQuery(queryString, results => {
    // 判断是否已存在账号
    if (results[0]) {
      errorFn.error(res, 100004);
      return false;
    }
    // 注册账号
    const sqlAdd = "insert into user(user,pass,address) values(?,?,?)";
    const addDates = [user, pass, osFn.getIPAdress()];
    mysql.sqlAdd(sqlAdd, addDates, () => {
      res.cookie("q_uid", user);
      res.cookie("token", tokenFn.creatToken(user, pass));
      res.cookie("q_m", userFn.creatPass(pass));
      res.send({
        code: 0,
        message: "注册成功"
      });
    });
  });
});
module.exports = router;
