const express = require("express");
const { getList } = require('./getList');
const { auction } = require('./auction');
const { groundingActive } = require('./groundingActive');
const router = new express.Router();
router.post("/getList", getList);
router.post("/groundingActive", groundingActive);
router.post("/auction", auction);
module.exports = router;