
const { chatGlobal } = require('./config');
const { getRoleGlobal } = require('../roleG/getRoleGlobal');
module.exports = {
    /**
     * 发送帮会信息
     * @param {*} req 
     * @param {*} res 
     * @param {*} text 发送的内容
     * @returns gang.list: [{ t: '内容', n: "发送角色名", s: '发送时间' }],
     * @returns gang.read:[id] 已读id
     */
    sendGang: function (req, res, text) {
        const { socialize_pool, role_name, role_id } = getRoleGlobal(req, res);
        const { gang } = socialize_pool;
        if (!gang) {
            return {
                list: [],
                read: [],
                socializeName: ''
            }
        }
        let chat = chatGlobal['gang'][gang.id];
        if (!chat) {
            chat = {
                list: [],
                read: [],
                socializeName: gang.name
            }
        }
        // 已读成员重置为仅自己
        chat['read'] = [role_id];
        const session = {
            t: text,
            n: role_name,
            s: parseInt(new Date() / 1000),
        }
        // 最多200百条记录,如超过删除最早一条
        if (chat.list.length >= 200) {
            chat.list.splic(0, 1);
        }
        chat.list.push(session)
        chatGlobal['gang'][gang.id] = chat;
        return {
            ...chat,
            socializeName: gang.name
        }
    }
}