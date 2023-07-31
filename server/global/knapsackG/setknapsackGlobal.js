const { KNAPSACK_Global } = require('./config');
const roleG = require('../roleG');

module.exports = {
    /**
     * 设置背包信息
     * @param {*} req 
     * @param {*} res 
     * @param {*} knapsack 背包信息
     * @returns {*} knapsack:{data:[],yuanbao,tael}| undefined
     */
    setknapsackGlobal: function (req, res, knapsack) {
        const { role_id } = roleG.getRoleGlobal(req, res);
        KNAPSACK_Global[role_id] = {
            ...knapsack,
            data: JSON.parse(knapsack['data']),
            updateKeys: [],
            id: role_id
        };
    }
}
