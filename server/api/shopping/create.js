const { ErrorG, RoleG, KnapsackG } = require("@/global");
const { ShopSql } = require("@/mysql");

module.exports = {
    /**
     * 创建店铺
     * @param {*} req.name
     */
    create: async function (req, res) {
        const { name } = req.body;
        if (!name) {
            ErrorG.paramsError(res);
            return;
        }
        const { role_id, role_name, user_id } = RoleG.getRoleGlobal(req, res);
        const results = await ShopSql.asyncIdOrNameToShop(role_id, name);
        if (results[0]) {
            res.send({
                code: 0,
                message: '店铺名重复!'
            })
            return;
        }
        const { tael } = KnapsackG.getknapsackGlobal(req, res);
        if (tael < 500000) {
            res.send({
                code: 0,
                message: '银两不足500000'
            })
            return;
        }
        const shop = await ShopSql.asyncCreateShop({ user_id, role_id, role_name, name });

        res.send({
            code: 0,
            data: shop
        })
    }
}

