const express = require("express");
const router = new express.Router();
const { exchange } = require('./exchange');
const { invest } = require('./invest');
const { receiveInvest } = require('./receiveInvest');
// 货币兑换
router.post("/exchange", exchange);
// 送财童子-投资
router.post("/invest", invest);
// 送财童子-领取投资
router.post("/receiveInvest", receiveInvest);

module.exports = router;