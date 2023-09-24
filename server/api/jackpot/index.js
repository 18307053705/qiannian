const express = require("express");
const { lingShouShan } = require('./lingShouShan');
const { equipDraw } = require('./equipDraw');

const router = new express.Router();

// 灵兽山砸宠
router.post("/lingShouShan", lingShouShan);
// 神装宝箱
router.post("/equipDraw", equipDraw);

module.exports = router;
