const express = require("express");

const router = new express.Router();

const Global = require("../global");


// const CHAT_TYPE_MEUN = {
//     0: 'system',
//     1: 'private',
//     2: 'gang',
//     3: 'intersect',
//     4: 'ranks',
//     5: 'world',
//     6: 'broadcast'
// }

router.post("/set", (req, res) => {
    const { type, t_role, text } = req.body;
    // 系统信息角色无法发送, 且私聊必须有对方id
    if (type == 0 || (type === 1 && !t_role) || !text) {
        res.send({
            code: 10005,
            data: '参数错误'
        })
        return;
    }
    const { socialize_pool, role_name, role_id } = Global.getRoleGlobal(req);

    // 系统，世界，广播
    if ([0, 5, 6].includes(type)) {
        Global[Global.CHAT_TYPE_MEUN[type]].push({
            t: text,
            n: role_name,
            s: new Date() * 1,
            id: role_id
        })
        res.send({
            code: 0,
            data: Global[Global.CHAT_TYPE_MEUN[type]],
            text: '发送成功！'
        })
        return;
    }
    if (type === 1) {
        const { list = [] } = Global.chatGlobal['private'][t_role] || {};
        list.push({
            t: text,
            n: role_name,
            s: new Date() * 1,
            id: role_id
        })
        Global.chatGlobal['private'][t_role] = {
            list,
            read: false
        }
        res.send({
            code: 0,
            data: '',
            text: '发送成功！'
        })
        return;
    }
    const { readId, chatInfo, socializeName } = Global.getChatSocializeGlobal(socialize_pool, type)
    if (readId) {
        const { list = [] } = chatInfo || {};
        list.push({
            t: text,
            n: role_name,
            s: new Date() * 1,
            id: role_id
        })
        Global.chatGlobal[Global.CHAT_TYPE_MEUN[type]][readId] = {
            list,
            read: [role_id]
        }
        res.send({
            code: 0,
            data: list,
            socializeName
        })
        return;
    }
    res.send({
        code: 0,
        data: [],
    })


});


router.post("/get", (req, res) => {
    const { type = -1 } = req.body;
    // 系统，世界，广播
    if ([0, 5, 6].includes(type)) {
        res.send({
            code: 0,
            data: Global['chatGlobal'][Global.CHAT_TYPE_MEUN[type]]
        })
        return;
    }

    const { role_id, socialize_pool } = Global.getRoleGlobal(req);
    const { readId, chatInfo, gangChat, intersectChat, ranksChat, socializeName } = Global.getChatSocializeGlobal(socialize_pool, type)
    // 判断是否有未读信息
    const privateChat = Global.chatGlobal['private'][role_id];
    if (type === -1) {
        const readMap = []
        // 判断是否私聊未读
        privateChat && !privateChat.read && readMap.push(1);
        // 判断是否帮会未读
        gangChat && !gangChat.read.includes(role_id) && readMap.push(2);
        // 判断是否结义未读
        intersectChat && !intersectChat.read.includes(role_id) && readMap.push(3);
        // 判断是否队伍未读
        ranksChat && !ranksChat.read.includes(role_id) && readMap.push(4);
        // 判断是否有最新系统公告
        res.send({
            code: 0,
            data: readMap,
            system: Global['chatGlobal']['system'][0]
        })
        return;
    }
    // 获取私聊信息
    if (type === 1) {
        const { list = [], read = true } = privateChat || {};
        if (read === false) {
            Global.setChatReadGlobal(type, role_id);
        }
        res.send({
            code: 0,
            data: list
        })
        return;
    }
    if ([2, 3, 4].includes(type) && readId) {
        const { list = [], read = false } = chatInfo || {};
        if (read && !read.includes(role_id)) {
            Global.setChatReadGlobal(type, readId, role_id);
        }
        res.send({
            code: 0,
            data: list,
            socializeName
        })
        return;
    }
    res.send({
        code: 0,
        data: []
    })

});


module.exports = router;
