const express = require("express");
const { lingShouShan } = require('./lingShouShan');
const { equipDraw } = require('./equipDraw');
const { jackpotLevel } = require('./jackpotLevel');
const { jackpotArt } = require('./jackpotArt');

const router = new express.Router();

// 灵兽山砸宠
router.post("/lingShouShan", lingShouShan);
// 神装宝箱
router.post("/equipDraw", equipDraw);
// 玩家等级抽奖
router.post("/jackpotLevel", jackpotLevel);
// 仙术抽奖
router.post("/jackpotArt", jackpotArt);
module.exports = router;
