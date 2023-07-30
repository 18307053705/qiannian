const express = require("express");
const { getRoleList } = require('./getRoleList');
const { getRoleInfo } = require('./getRoleInfo');
const { roleLogin } = require('./roleLogin');



const router = new express.Router();
// 角色列表
router.post("/getRoleList", getRoleList);
// 角色信息
router.post("/getRoleInfo", getRoleInfo);
// 角色选择
router.post("/roleLogin", roleLogin);

module.exports = router;