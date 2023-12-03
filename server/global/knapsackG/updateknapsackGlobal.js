const { KNAPSACK_Global } = require('./config');
const roleG = require('../roleG');

module.exports = {
    /**
     * 更新背包信息
     * @param {*} req 
     * @param {*} res 
     * @param {*} updata 需要更新的信息
     * @param {*} roleId ,可选参数
     * @returns {*} knapsack:{data:[],yuanbao,tael}
     */
    updateknapsackGlobal: function (req, res, updata, roleId) {
        const { role_id } = roleG.getRoleGlobal(req, res, roleId);
        const knapsack = KNAPSACK_Global[roleId || role_id];
        let updateKeys = Object.keys(updata);
        if (knapsack) {
            KNAPSACK_Global[knapsack.role_id] = {
                ...knapsack,
                ...updata,
                updateKeys: [...knapsack.updateKeys, ...updateKeys]
            };
        }
        return knapsack;
    }
}
