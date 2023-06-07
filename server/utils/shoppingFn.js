const mysql = require("../mysql");
module.exports = {
    // 获取店铺信息
    getShopInfo: async function (id) {
        const { results } = await mysql.asyncQuery(`select * from shop  where role_id="${role.id}"`);
        return results[0];
    },
}