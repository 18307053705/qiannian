const express = require("express");
const router = new express.Router();
const { getRankList } = require('./getRankList');

//  获取排名信息
router.post("/getRankList", getRankList);


module.exports = router;
