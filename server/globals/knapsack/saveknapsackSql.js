const { KnapsackSql } = require('@/mysql');
const { KNAPSACK_Global } = require('./config');
const { saveSqlChang } = require('./saveSqlChang');

module.exports = {
    /**
     * 保存背包信息至数据库
     * @param {*} req 
     * @param {*} res 
     * @param {*} role_id 角色Id,可选
     */
    saveknapsackSql: async function (req, res, roleId) {
        const { role_id } = RoleG.getRoleGlobal(req, res);
        const { updateKeys, ...knapsack } = KNAPSACK_Global[roleId || role_id];
        const data = {};
        [...new Set(updateKeys)].forEach((key) => {
            data[key] = key === 'data' ? saveSqlChang(knapsack[key]) : knapsack[key];
        })

        if (JSON.stringify(data) !== '{}') {
            await KnapsackSql.asyncUpdateKnapsack(role_id, data);
        }
        return
    }
}
