const { KNAPSACK_Global } = require('./config');
const roleG = require('../roleG');

module.exports = {
    /**
     * 获取背包信息
     * @param {*} req 
     * @param {*} res 
     * @param {*} roleId,可选参数
     * @returns {*} knapsack:{data:[],yuanbao,tael}| undefined
     */
    getknapsackGlobal: function (req, res, roleId) {
        const { role_id } = roleG.getRoleGlobal(req, res, { role_id: roleId }) || {};
        const knapsack = KNAPSACK_Global[roleId || role_id];
        return knapsack ? JSON.parse(JSON.stringify(knapsack)) : undefined;
    }
}
