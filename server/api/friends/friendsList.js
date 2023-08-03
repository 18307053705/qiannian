const { RoleG } = require("../../global");
module.exports = {
    // 好友删除
    friendsList: async function (req, res) {
        const { role_id } = RoleG.getRoleGlobal(req, res);
        const { results } = await res.asyncQuery(`select * from friends  where role_id="${role_id}"`)
        res.send({
            code: 0,
            data: results[0]
        })

    }
}