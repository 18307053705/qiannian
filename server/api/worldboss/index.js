const express = require("express");
const { atkBoss } = require('./atkBoss');
const { getBossInfo } = require('./getBossInfo');


const router = new express.Router();

// 获取boss信息
router.post("/getBossInfo", getBossInfo);
// 攻击世界boss
router.post("/atkBoss", atkBoss);


module.exports = router;