const express = require("express");
const { creatFight } = require('./creatFight');
const { fightDir } = require('./fightDir');



const router = new express.Router();
// 创建战斗
router.post("/creatFight", creatFight);
// 战斗指令
router.post("/fightDir", fightDir);

module.exports = router;