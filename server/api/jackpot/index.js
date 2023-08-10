const express = require("express");
const { lingShouShan } = require('./lingShouShan');

const router = new express.Router();

// 灵兽山砸宠
router.post("/lingShouShan", lingShouShan);

module.exports = router;
