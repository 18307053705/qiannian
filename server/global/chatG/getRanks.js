
const { chatGlobal } = require('./config');
module.exports = {
    /**
     * 获取队伍聊天
     * @param {*} req 
     * @param {*} res
     * @param {*} isRead 是否设置已读,默认false
     * @returns list: [{ t: '内容', n: "发送角色名", s: '发送时间' }],
     * @returns read:[id] 已读id
     */
    getRanks: function (req, res, isRead) {
        const { socialize_pool, role_id } = RoleG.getRoleGlobal(req, res);
        const { ranks } = socialize_pool;
        if (!ranks) {
            return {
                list: [],
                read: [role_id],
                message: '你没有加入队伍哟。'
            }
        }
        let chat = chatGlobal['ranks'][ranks.id];
        if (!chat) {
            return {
                list: [],
                read: [role_id],
                socializeName: ranks.name
            }
        }
        if (isRead && !chat.read.includes(role_id)) {
            // 设置已读
            chat.read.push(role_id);
        }
        return {
            ...chat,
            socializeName: ranks.name
        };
    }
}