const express = require("express");
const { friendsList } = require('./friendsList');
const { friendsApply } = require('./friendsApply');
const { friendsActive } = require('./friendsActive');
const { friendsDelete } = require('./friendsDelete');



const router = new express.Router();
// 好友列表
router.post("/list", friendsList);
// 好友申请
router.post("/apply", friendsApply);
// 好友申请处理
router.post("/active", friendsActive);
// 好友申请处理
router.post("/delete", friendsDelete);
module.exports = router;