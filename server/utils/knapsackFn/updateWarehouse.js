const { WarehouseSql } = require('@/mysql');
module.exports = {
    /**
     * 更新仓库
     * @param {*} req 
     * @param {*} res
     * @param {*} data // 更新数据{data,yuanbao,teal}
     */
    updateWarehouse: async function (req, res, data) {
        const { role_id } = RoleG.getRoleGlobal(req, res);
        const upData = {};
        Object.keys(data).forEach(key => {
            upData[key] = key === 'data' ? KnapsackG.saveSqlChang(data[key]) : data[key];
        })
        return WarehouseSql.asyncUpdateWarehouse(role_id,upData);
    },
}