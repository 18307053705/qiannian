const express = require("express");
const { get } = require('./get');
const { set } = require('./set');
const { mosaic } = require('./mosaic');
const { atry } = require('./atry');




const router = new express.Router();
// 获取珍宝信息
router.post("/get", get);
// 珍宝操作
router.post("/set", set);
// 家具镶嵌
router.post("/mosaic", mosaic);
// 搏一搏
router.post("/atry", atry);

module.exports = router;