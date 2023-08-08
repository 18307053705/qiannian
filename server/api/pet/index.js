const express = require("express");
const { drawPet } = require('./drawPet');
const { detailPet } = require('./detailPet');

const router = new express.Router();

// 灵兽山砸宠
router.post("/drawPet", drawPet);
// 宠物详情
router.post("/detailPet", detailPet);

module.exports = router;
