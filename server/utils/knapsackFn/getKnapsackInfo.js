const { KnapsackG } = require("../../global");
module.exports = {
    /**
     * 获取背包信息
     * @param {*} req 
     * @param {*} res 
     * @param {*} data.role_id 可选参数
     * @returns {*} Promise(knapsack:{data:[],yuanbao,tael}| undefined)
     */
    getKnapsackInfo: async function (req, res, { role_id } = {}) {
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