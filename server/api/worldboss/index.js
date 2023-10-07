const express = require("express");
const { atkBoss } = require('./atkBoss');
const { getBossInfo } = require('./getBossInfo');
const { getRankReward } = require('./getRankReward');
const { getShedReward } = require('./getShedReward');


const router = new express.Router();

// 获取boss信息
router.post("/getBossInfo", getBossInfo);
// 攻击世界boss
router.post("/atkBoss", atkBoss);
// 获取boss排名奖励
router.post("/getRankReward", getRankReward);
// 捡取boss掉落物品
router.post("/getShedReward", getShedReward);


module.exports = router;