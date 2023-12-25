const { FriendsSql } = require('@/mysql');
module.exports = {
    // 好友删除
    friendsDelete: async function (req, res) {
        const { role_id: t_roleId } = req.body;
        const { role_id: i_roleId } = RoleG.getRoleGlobal(req, res);
        // 查询自己与对方的好友信息
        const data = await FriendsSql.asyncGetFriendsInfos([i_roleId, t_roleId]);
        if (data.length) {
            const isRole = data[0]['role_id'] === i_roleId;
            const i_role = isRole ? data[0] : data[1];
            const t_role = isRole ? data[1] : data[0];
            let { list: i_list } = i_role;
            let { list: t_list } = t_role;
            i_list = i_list.filter(({ id }) => id !== t_roleId);
            t_list = t_list.filter(({ id }) => id !== i_roleId);
            await Promise.all([
                FriendsSql.asyncUpdateFriends(i_roleId, { list: i_list }),
                FriendsSql.asyncUpdateFriends(t_roleId, { list: t_list })
            ]);
            res.send({
                code: 0,
                success: '删除成功'
            })

        }

    }
}
