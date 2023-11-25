const express = require("express");
const router = new express.Router();
const { gather } = require('./gather');
// 采集天材地宝
router.post("/gather", gather);

module.exports = router;
