const { KnapsackG, RoleG } = require("../../global");
module.exports = {
    /**
     * 获取背包信息
     * @param {*} req 
     * @param {*} res 
     * @param {*} data.role_id 可选参数
     * @param {*} data.type 可选参数3获取仓库数据
     * @returns {*} Promise(knapsack:{data:[],yuanbao,tael}| undefined)
     */
    getKnapsackInfo: async function (req, res, { role_id, type } = {}) {
        if (type == 3) {
            // 仓库不存在获取其他人
            const { role_id: roleId } = RoleG.getRoleGlobal(req, res);
            const { results } = await mysql.asyncQuery(`select * from warehouse  where role_id="${roleId}"`);
            const data = JSON.parse(results[0].data);
            return {
                ...results[0],
                data
            };
        }
        // 获取背包信息
        const knapsack = KnapsackG.getknapsackGlobal(req, res, role_id);
        if (knapsack) {
            return knapsack;
        }
        const { results } = await res.asyncQuery(`select * from knapsack  where role_id="${role_id}"`);
        const data = JSON.parse(results[0].data);
        return {
            ...results[0],
            data
        };
    },

}