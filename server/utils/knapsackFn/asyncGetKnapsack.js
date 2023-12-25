const { WarehouseSql, KnapsackSql } = require("@/mysql");
module.exports = {
    /**
     * 获取背包信息
     * @param {*} req 
     * @param {*} res 
     * @param {*} role_id 可选参数
     * @returns {*} Promise(knapsack:{data:[],yuanbao,tael}| undefined)
     */
    asyncGetKnapsack: async function (req, res, { role_id, type }) {
        if (type == 3) {
            // 仓库不存在获取其他人
            const { role_id: roleId } = RoleG.getRoleGlobal(req, res);
            const results = await WarehouseSql.asyncGetarehouse(roleId);
            const data = KnapsackG.dataListChang(results.data, true);
            return {
                ...results,
                data
            };
        }
        // 获取背包信息
        const knapsack = KnapsackG.getknapsackGlobal(req, res, role_id);
        if (knapsack) {
            return knapsack;
        }
        const results = await KnapsackSql.asyncGetKnapsack(role_id);
        const data = KnapsackG.dataListChang(results.data);
        return {
            ...results[0],
            data
        };
    },

}