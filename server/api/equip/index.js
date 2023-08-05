const express = require("express");
const { getEquipList } = require('./getEquipList');
// const { operate } = require('./operate');

const router = new express.Router();

// 获取装备列表
router.post("/getEquipList", getEquipList);
// 物品 使用 入库 出库 丢弃
// router.post("/operate", operate);


module.exports = router;