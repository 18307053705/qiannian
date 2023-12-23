module.exports = {
    // 好友删除
    friendsDelete: async function (req, res) {
        const { role_id: t_roleId } = req.body;
        const { role_id: i_roleId } = RoleG.getRoleGlobal(req, res);
        // 查询自己与对方的好友信息
        const { results } = await res.asyncQuery(`select * from friends  where role_id="${t_roleId}" or role_id="${i_roleId}"`);
        if (results.length) {
            const isRole = results[0]['role_id'] === i_roleId;
            const i_role = isRole ? results[0] : results[1];
            const t_role = isRole ? results[1] : results[0];
            let i_list = JSON.parse(i_role.list);
            let t_list = JSON.parse(t_role.list);
            i_list = i_list.filter(({ id }) => id !== t_roleId);
            t_list = t_list.filter(({ id }) => id !== i_roleId);
            res.asyncQuery(`update friends set list='${JSON.stringify(i_list)}' where role_id="${i_roleId}";`);
            res.asyncQuery(`update friends set list='${JSON.stringify(t_list)}' where role_id="${t_roleId}";`);
            res.send({
                code: 0,
                success: '删除成功'
            })

        }

    }
}