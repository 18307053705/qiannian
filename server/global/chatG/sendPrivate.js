
const { chatGlobal } = require('./config');
const { getRoleGlobal } = require('../roleG/getRoleGlobal');
module.exports = {
    /**
     * 发送私聊信息信息
     * @param {*} req 
     * @param {*} res 
     * @param {*} text 发送的内容
     * @param {*} t_role 目标id
     * @returns private.list: [{ t: '内容', n: "发送角色名", s: '发送时间' }],
     * @returns private.read: true 是否已读
     */
    sendPrivate: function (req, res, text, t_role) {
        const { role_name, role_id } = getRoleGlobal(req, res);
        let private = chatGlobal['private'][t_role];
        if (!private) {
            private = {
                list: [],
                read: false
            }
        }
        // 重置为未读
        private['read'] = false;
        const session = {
            t: text,
            n: role_name,
            s: parseInt(new Date() / 1000),
            id: role_id
        }
        // 最多200百条记录,如超过删除最早一条
        if (private.list.length >= 200) {
            private.list.splic(0, 1);
        }
        private.list.push(session)
        chatGlobal['private'][t_role] = private;
        if (chatGlobal['private'][role_id]) {
            return {
                ...chatGlobal['private'][role_id]
            }
        }
        return {
            list: [],
            read: true
        };

    }
}