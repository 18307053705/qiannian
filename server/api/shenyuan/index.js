const express = require("express");
const router = new express.Router();
const { getShenRank } = require('./getShenRank');
const { shenyuanFight } = require('./shenyuanFight');

// 获取深渊信息
router.post("/getShenRank", getShenRank);
// 进入深渊战斗
router.post("/shenyuanFight", shenyuanFight);
module.exports = router;
