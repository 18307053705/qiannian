const express = require("express");
const { getEquipList } = require('./getEquipList');
const { unloadEquip } = require('./unloadEquip');
const { renameEquip } = require('./renameEquip');
const { firmeEquip } = require('./firmeEquip');
const { forgeEquip } = require('./forgeEquip');
const { sigilEquip } = require('./sigilEquip');
const { getGemList } = require('./getGemList');
const { mosaicEquip } = require('./mosaicEquip');
const { unloadGem } = require('./unloadGem');
const { makeEquip } = require('./makeEquip');
const { makeEquipInfo } = require('./makeEquipInfo');

const router = new express.Router();

// 获取装备列表
router.post("/getEquipList", getEquipList);
// 装备卸下
router.post("/unloadEquip", unloadEquip);
// 装备重命名
router.post("/renameEquip", renameEquip);
// 装备强化
router.post("/firmeEquip", firmeEquip);
// 装备强化
router.post("/forgeEquip", forgeEquip);
// 装备强化
router.post("/sigilEquip", sigilEquip);
// 获取宝石
router.post("/getGemList", getGemList);
// 装备镶嵌
router.post("/mosaicEquip", mosaicEquip);
// 卸下宝石
router.post("/unloadGem", unloadGem);
// 获得全部装备
router.post("/makeEquip", makeEquip);
// 打造装备的信息
router.post("/makeEquipInfo", makeEquipInfo);
module.exports = router;