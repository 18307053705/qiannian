const { KNAPSACK_Global } = require('./config');
const { dataListChang } = require('./dataListChang');

module.exports = {
    /**
     * 设置背包信息
     * @param {*} req 
     * @param {*} res 
     * @param {*} knapsack 背包信息
     * @returns {*} knapsack:{data:[],yuanbao,tael}| undefined
     */
    setknapsackGlobal: function (req, res, knapsack) {
        const { role_id } = RoleG.getRoleGlobal(req, res);
        KNAPSACK_Global[role_id] = {
            ...knapsack,
            data: dataListChang(knapsack['data']),
            updateKeys: [],
            id: role_id
        };
    }
}
