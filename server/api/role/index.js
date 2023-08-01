const express = require("express");
const { getRoleList } = require('./getRoleList');
const { getRoleInfo } = require('./getRoleInfo');
const { roleLogin } = require('./roleLogin');
const { createRole } = require('./createRole');
const { roleExit } = require('./roleExit');




const router = new express.Router();
// 角色列表
router.post("/getRoleList", getRoleList);
// 角色信息
router.post("/getRoleInfo", getRoleInfo);
// 角色选择
router.post("/roleLogin", roleLogin);
// 创建角色
router.post("/createRole", createRole);
// 角色退出
router.post("/exit", roleExit);

module.exports = router;