const express = require("express");
const { sendDir } = require('./sendDir');
const { createFightDir } = require('./createFightDir');



const router = new express.Router();
// 发送地图指令
router.post("/sendDir", sendDir);
// 创建战斗指令
router.post("/createFightDir", createFightDir);

module.exports = router;