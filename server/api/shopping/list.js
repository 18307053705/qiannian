const { RoleG } = require("@/global");
const { ShopSql } = require("@/mysql");

module.exports = {
    /**
     * 获取店铺列表
     */
    list: async function (req, res) {
        const { role_id } = RoleG.getRoleGlobal(req, res);
        const { results } = await ShopSql.asyncShopList(role_id);
        res.send({
            code: 0,
            data: results
        })
    }
}

