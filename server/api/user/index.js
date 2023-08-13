const express = require("express");
const router = new express.Router();
const { login } = require('./login');
const { register } = require('./register');
// 登录
router.post("/login", login);
// 注册
router.post("/register", register);

module.exports = router;
