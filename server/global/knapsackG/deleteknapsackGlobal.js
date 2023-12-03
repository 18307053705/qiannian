const { KNAPSACK_Global } = require('./config');
const roleG = require('../roleG');

module.exports = {
    /**
     * 释放全局背包
     * @param {*} req 
     * @param {*} res 
     * @param {*} roleId,可选参数
     */
    deleteknapsackGlobal: function (req, res, roleId) {
        const { role_id } = roleG.getRoleGlobal(req, res, roleId);
        delete KNAPSACK_Global[roleId || role_id];
    }
}
