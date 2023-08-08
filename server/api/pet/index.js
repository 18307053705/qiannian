const express = require("express");
const { drawPet } = require('./drawPet');
const { detailPet } = require('./detailPet');
const { petRoom } = require('./petRoom');
const { petWearEquip } = require('./petWearEquip');
const { petUnloadEquip } = require('./petUnloadEquip');
const { renameEquip } = require('./renameEquip');
const { petStatu } = require('./petStatu');
const { petReborn } = require('./petReborn');
const { petFlair } = require('./petFlair');

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
// 宠物装备改名
router.post("/renameEquip", renameEquip);
// 宠物状态切换
router.post("/petStatu", petStatu);
// 宠物资质
router.post("/petFlair", petFlair);
// 宠物转生
router.post("/petReborn", petReborn);
module.exports = router;
