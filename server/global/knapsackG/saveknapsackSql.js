const { KNAPSACK_Global } = require('./config');
const roleG = require('../roleG');

module.exports = {
    /**
     * 保存背包信息至数据库
     * @param {*} req 
     * @param {*} res 
     * @param {*} role_id 角色Id,可选
     */
    getknapsackGlobal: async function (req, res, roleId) {
        const { role_id } = roleG.getRoleGlobal(req, res);
        const { updateKeys, ...knapsack } = KNAPSACK_Global[roleId || role_id];
        const data = [];
        [...new Set(updateKeys)].forEach((key) => {
            const value = key === 'data' ? JSON.stringify(knapsack[key]) : knapsack[key];
            data.push(`${key}='${value}'`)
        })
        if (data.length) {
            await res.asyncQuery(`update knapsack  SET ${data.join(',')}  where role_id="${role_id}"`);
        }
        return
    }
}
