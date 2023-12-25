const { FriendsSql } = require('@/mysql');
module.exports = {
    // 获取好友列表
    friendsList: async function (req, res) {
        const { role_id } = RoleG.getRoleGlobal(req, res);
        const results = await FriendsSql.asyncGetFriendsInfo(role_id);
        res.send({
            code: 0,
            data: results
        })

    }
}