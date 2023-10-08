const express = require("express");
const { getRankInfo } = require('./getRankInfo');
const { getRankReward } = require('./getRankReward');


const router = new express.Router();

// 获取排名信息
router.post("/getRankInfo", getRankInfo);
// 获取排名奖励
router.post("/getRankReward", getRankReward);


module.exports = router;