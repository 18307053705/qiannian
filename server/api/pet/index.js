const express = require("express");
const { drawPet } = require('./drawPet');
const { detailPet } = require('./detailPet');
const { petRoom } = require('./petRoom');
const { petWearEquip } = require('./petWearEquip');
const { petUnloadEquip } = require('./petUnloadEquip');

const router = new express.Router();

// 灵兽山砸宠
router.post("/drawPet", drawPet);
// 宠物详情
router.post("/detailPet", detailPet);
// 宠物房扩张
router.post("/petRoom", petRoom);
// 宠物佩戴装备
router.post("/petWearEquip", petWearEquip);
// 宠物卸下装备
router.post("/petUnloadEquip", petUnloadEquip);
module.exports = router;
