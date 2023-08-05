const express = require("express");
const { getEquipList } = require('./getEquipList');
const { unloadEquip } = require('./unloadEquip');
const { renameEquip } = require('./renameEquip');
const { firmeEquip } = require('./firmeEquip');
const { forgeEquip } = require('./forgeEquip');
const { sigilEquip } = require('./sigilEquip');

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
module.exports = router;