const express = require("express");
const { get } = require('./get');
const { send } = require('./send');
const { getUnread } = require('./getUnread');

const router = new express.Router();
// 获取聊天信息
router.post("/get", get);
// 发送聊天信息
router.post("/send", send);
// 获取未读信息
router.post("/getUnread", getUnread);


module.exports = router;