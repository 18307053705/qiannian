const express = require("express");
const { rank } = require('./rank');
const { prize } = require('./prize');

const router = new express.Router();
// 获取战场排名
router.post("/rank", rank);
// 获取战场奖励
router.post("/prize", prize);
module.exports = router;