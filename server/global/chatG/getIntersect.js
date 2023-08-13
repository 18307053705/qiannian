
const { chatGlobal } = require('./config');
const { getRoleGlobal } = require('../roleG/getRoleGlobal');
module.exports = {
    /**
     * 获取结义聊天
     * @param {*} req 
     * @param {*} res
     * @param {*} isRead 是否设置已读,默认false
     * @returns list: [{ t: '内容', n: "发送角色名", s: '发送时间' }],
     * @returns read:[id] 已读id
     */
    getIntersect: function (req, res, isRead) {
        const { socialize_pool, role_id } = getRoleGlobal(req, res);
        const { intersect } = socialize_pool;
        if (!intersect) {
            return {
                list: [],
                read: [role_id],
                socializeName: ''
            }
        }
        let chat = chatGlobal['intersect'][intersect.id];
        if (!chat) {
            return {
                list: [],
                read: [role_id],
                socializeName: intersect.name
            }
        }
        if (isRead && !chat.read.includes(role_id)) {
            // 设置已读
            chat.read.push(role_id);
        }

        return {
            ...chat,
            socializeName: intersect.name
        };
    }
}