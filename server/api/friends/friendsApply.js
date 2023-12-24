module.exports = {
    // 好友申请
    friendsApply: async function (req, res) {
        const { role_id } = req.body;
        if (!role_id) {
            ErrorG.paramsError(res);
            return;
        }
        const { role_id: roleId, role_name } = RoleG.getRoleGlobal(req, res);
        const { results } = await res.asyncQuery(`select * from friends  where role_id="${role_id}"`);
        if (results[0]) {
            const apply = JSON.parse(results[0].apply);
            const list = JSON.parse(results[0].list);
            if (list.length === 200) {
                res.send({
                    code: 0,
                    message: '对方好友数已满，暂时无法申请。'
                })
                return;
            }
            if (apply.length === 100) {
                res.send({
                    code: 0,
                    message: '对方好友数申请过多，暂时无法申请。'
                })
                return;
            }
            if (apply.find(({ id }) => (id === roleId))) {
                res.send({
                    code: 0,
                    message: '申请重复'
                })
                return;
            }
            if (list.find(({ id }) => (id === roleId))) {
                res.send({
                    code: 0,
                    message: '已存在好友列表'
                })
                return;
            }
            // 加入对方的好友列表
            apply.push({
                id: roleId,
                n: role_name
            });

            await res.asyncQuery(`update friends set apply='${JSON.stringify(apply)}' where role_id="${role_id}"; `);
            res.send({
                code: 0,
                success: '申请成功，请等待对方确定',
            })
        }

    }
}