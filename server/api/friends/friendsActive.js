const { RoleG, ErrorG } = require("../../global");
module.exports = {
    // 好友申请处理
    friendsActive: async function (req, res) {
        const { role_id, state } = req.body;
        if (!role_id) {
            ErrorG.paramsError(res);
            return false;
        }
        const { role_id: roleId, role_name } = RoleG.getRoleGlobal(req, res);
        const { results } = await res.asyncQuery(`select * from friends  where role_id="${roleId}" or role_id="${role_id}"`);
        if (results) {
            const isRole = results[0]['role_id'] === roleId;
            const i_role = isRole ? results[0] : results[1];
            const t_role = isRole ? results[1] : results[0];
            let i_list = JSON.parse(i_role.list);
            let i_apply = JSON.parse(i_role.apply);
            let t_list = JSON.parse(t_role.list);
            let addInfo = undefined;
            // 找到申请中对应的信息
            i_apply = i_apply.filter((itme, index) => {
                if (itme.id === role_id) {
                    addInfo = itme;
                    return false;
                }
                return true;
            })
            if (i_list.find(({ id }) => id === role_id)) {
                res.asyncQuery(`update friends  SET apply='${JSON.stringify(i_apply)}' where role_id="${roleId}"`);
                res.send({
                    code: 0,
                    message: '你们已经是好友了。'
                })
                return;
            }

            // 通过并在申请列表中找到对应信息
            if (state && addInfo) {
                i_list.push({
                    ...addInfo,
                    i: 0, // 亲密度
                })
                t_list.push({
                    id: roleId,
                    n: role_name,
                    i: 0, // 亲密度
                })
                const i_sql = [`list='${JSON.stringify(i_list)}'`, `apply='${JSON.stringify(i_apply)}'`];
                res.asyncQuery(`update friends  SET ${i_sql.join(',')} where role_id="${roleId}"`);
                await res.asyncQuery(`update friends  SET list='${JSON.stringify(t_list)}' where role_id="${role_id}"`);
                res.send({
                    code: 0,
                    data: ''
                })
            }
        }

    }
}