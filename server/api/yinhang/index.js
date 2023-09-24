const express = require("express");
const router = new express.Router();
const { exchange } = require('./exchange');
// 货币兑换
router.post("/exchange", exchange);

module.exports = router;