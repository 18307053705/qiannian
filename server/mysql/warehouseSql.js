const { asyncQuery, asyncAdd } = require('./config');
module.exports = {
    /**
    * 添加仓库信息
    * @param {*} user 账号
    * @param {*} role_id 角色id
    */
    asyncAddWarehouse: async function (user, role_id) {
        const warehouseSql = "insert into warehouse(user_id,role_id,tael,yuanbao,data) values(?,?,?,?,?)";
        const warehouseData = [user, role_id, 0, 0, '[]'];
        const { results } = await asyncAdd(warehouseSql, warehouseData);
        return results.insertId;;
    },
    /**
    * 获取库信息
    * @param {*} role_id 角色id
    */
    asyncGetarehouse: async function (role_id) {
        const { results } = await asyncAdd(`select * from warehouse  where role_id="${role_id}"`);
        return results[0];
    },
}
