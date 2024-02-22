const express = require("express");
const router = new express.Router();
const { getRankList } = require('./getRankList');
const { getRankReward } = require('./getRankReward');

//  获取排名信息
router.post("/getRankList", getRankList);

//  获取排名奖励
router.post("/getRankReward", getRankReward);

module.exports = router;
