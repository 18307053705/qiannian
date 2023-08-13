
const { chatGlobal } = require('./config');
const { getRoleGlobal } = require('../roleG/getRoleGlobal');
module.exports = {
    /**
     * 获取私聊
     * @param {*} req 
     * @param {*} res
     * @param {*} isRead 是否设置已读,默认false
     * @returns llist: [{ t: '内容', id: '发送角色Id', n: "发送角色名", s: '发送时间' }]
     * @returns read:true 是否已读
     */
    getPrivate: function (req, res, isRead) {
        const { role_id } = getRoleGlobal(req, res);
        let caht = chatGlobal['private'][role_id];
        if (!caht) {
            return {
                list: [],
                read: true
            }
        }
        if (isRead && !caht.read) {
            // 设置已读
            caht.read = true;
        }
        return caht;
    }
}