const { FriendsSql } = require('@/mysql');
module.exports = {
    // 好友申请处理
    friendsActive: async function (req, res) {
        const { role_id: t_roleId, state } = req.body;
        if (!t_roleId) {
            ErrorG.paramsError(res);
            return false;
        }
        const { role_id: i_roleId, role_name } = RoleG.getRoleGlobal(req, res);
        const data = await FriendsSql.asyncGetFriendsInfos([i_roleId, t_roleId]);
        if (data.length) {
            const isRole = data[0]['role_id'] === i_roleId;
            const i_role = isRole ? data[0] : data[1];
            const t_role = isRole ? data[1] : data[0];
            let { list: i_list, apply: i_apply } = i_role;
            let { list: t_list } = t_role;
            // 找到申请中对应的信息
            let tRole;
            i_apply = i_apply.filter((item) => {
                if (item.id === t_roleId) {
                    tRole = item;
                    return false;
                }
                return true;
            })
            if (!tRole) {
                res.send({
                    code: 0,
                    message: '未找到玩家信息。'
                })
                return;
            }
            // 判断好友列表是否存在目标
            const isFriends = i_list.find(({ id }) => id === t_roleId);
            if (isFriends) {
                FriendsSql.asyncUpdateFriends(i_roleId, { apply: i_apply });
                res.send({
                    code: 0,
                    message: '你们已经是好友，无法重复添加。'
                })
                return;
            }
            if (state === 0) {
                FriendsSql.asyncUpdateFriends(i_roleId, { apply: i_apply });
                res.send({
                    code: 0,
                    data: ''
                })
                return;
            }
            // 通过并在申请列表中找到对应信息
            i_list.push({
                ...tRole,
                i: 0, // 亲密度
            })
            t_list.push({
                id: i_roleId,
                n: role_name,
                i: 0, // 亲密度
            })
            await Promise.all([
                FriendsSql.asyncUpdateFriends(i_roleId, { list: i_list, apply: i_apply }),
                FriendsSql.asyncUpdateFriends(t_roleId, { list: t_list })
            ]);
            res.send({
                code: 0,
                data: ''
            })

        }

    }
}
