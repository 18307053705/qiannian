const { ChatG } = require('../../global');
module.exports = {
    /**
     * 获取未读信息
     */
    getUnread: function (req, res) {
        const { role_id } = RoleG.getRoleGlobal(req, res);
        const { system, private, gang, intersect, ranks } = ChatG.getChat(req, res);
        const readMap = [];
        // 判断是否私聊未读
        private.read || readMap.push(1);
        // 判断是否帮会未读
        gang.read.includes(role_id) || readMap.push(2);
        // 判断是否结义未读
        intersect.read.includes(role_id) || readMap.push(3);
        // 判断是否队伍未读
        ranks.read.includes(role_id) || readMap.push(4);
        res.send({
            code: 0,
            data: readMap,
            system: system.list.slice(-1)[0]
        })
    }
}
