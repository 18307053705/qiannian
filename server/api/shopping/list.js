const { RoleG } = require("../../global");

module.exports = {
    /**
     * 获取店铺列表
     */
    list: async function (req, res) {
        const { role_id } = RoleG.getRoleGlobal(req, res);
        const { results } = await res.asyncQuery(`select * from shop where role_id<>"${role_id}"`);
        res.send({
            code: 0,
            data: results
        })
    }
}

