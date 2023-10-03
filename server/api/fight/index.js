const express = require("express");
const { creatFight } = require('./creatFight');
const { fightDir } = require('./fightDir');
const { exitFight } = require('./exitFight');
const { getFightConfig } = require('./getFightConfig');
const { setFightConfig } = require('./setFightConfig');



const router = new express.Router();
// 创建战斗
router.post("/creatFight", creatFight);
// 战斗指令
router.post("/fightDir", fightDir);
// 退出战斗
router.post("/exitFight", exitFight);
// 获取战斗配置
router.post("/getFightConfig", getFightConfig);
// 设置战斗配置
router.post("/setFightConfig", setFightConfig);
module.exports = router;