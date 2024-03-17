const express = require("express");
const { distributionPotential } = require('./distributionPotential');
const { getJingJie } = require('./getJingJie');
const { resetPotential } = require('./resetPotential');
const { advanced } = require('./advanced');
const { tianJieFight } = require('./tianJieFight');
const { getTianJie } = require('./getTianJie');

const router = new express.Router();

// 分配潜力
router.post("/distributionPotential", distributionPotential);
// 获取境界信息
router.post("/getJingJie", getJingJie);
// 重置潜力
router.post("/resetPotential", resetPotential);
// 突破境界
router.post("/advanced", advanced);
// 天劫战斗
router.post("/tianJieFight", tianJieFight);
// 获取天劫信息
router.post("/getTianJie", getTianJie);

module.exports = router;
