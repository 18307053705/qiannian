const express = require("express");
const { creatPlayerFight } = require('./creatPlayerFight');
const { playerFightDir } = require('./playerFightDir');
const { exitFight } = require('./exitFight');



const router = new express.Router();
// 创建玩家战斗
router.post("/creatPlayerFight", creatPlayerFight);
// 玩家战斗指令
router.post("/playerFightDir", playerFightDir);
// 玩家战斗指令
router.post("/exitFight", exitFight);
module.exports = router;