
const { chatGlobal } = require('./config');
module.exports = {
    /**
     * 获取帮会聊天
     * @param {*} req 
     * @param {*} res
     * @param {*} isRead 是否设置已读,默认false
     * @returns list: [{ t: '内容', n: "发送角色名", s: '发送时间' }],
     * @returns read:[id] 已读id
     */
    getGang: function (req, res, isRead) {
        const { socialize_pool, role_id } = RoleG.getRoleGlobal(req, res);
        const { gang } = socialize_pool;
        if (!gang) {
            return {
                list: [],
                read: [role_id],
                socializeName: ''
            }
        }
        let chat = chatGlobal['gang'][gang.id];
        if (!chat) {
            return {
                list: [],
                read: [role_id],
                socializeName: gang.name
            }
        }
        if (isRead && !chat.read.includes(role_id)) {
            // 设置已读
            chat.read.push(role_id);
        }
        return {
            ...chat,
            socializeName: gang.name
        };
    }
}