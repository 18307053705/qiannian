const express = require("express");
const { distributionPotential } = require('./distributionPotential');
const { getJingJie } = require('./getJingJie');
const { resetPotential } = require('./resetPotential');

const router = new express.Router();

// 分配潜力
router.post("/distributionPotential", distributionPotential);
// 获取境界信息
router.post("/getJingJie", getJingJie);
// 重置潜力
router.post("/resetPotential", resetPotential);

module.exports = router;
