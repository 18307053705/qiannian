const express = require("express");
const { sendDir } = require('./sendDir');



const router = new express.Router();
// 发送地图指令
router.post("/sendDir", sendDir);

module.exports = router;