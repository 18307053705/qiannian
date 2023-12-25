const { asyncQuery, asyncAdd } = require('./config');
const KNAPSACK_JSON_KEY = ['data'];
module.exports = {
    /**
    * 添加背包信息
    * @param {*} user 账号
    * @param {*} role_id 角色id
    */
    asyncAddKnapsack: async function (user, role_id) {
        const sqlStr = "insert into knapsack(user_id,role_id,tael,yuanbao,data) values(?,?,?,?,?)";
        const list = [user, role_id, 1000, 0, '[]'];
        const { results } = await asyncAdd(sqlStr, list);
        return results.insertId;;
    },
    /**
     * 获取背包信息
     * @param {*} role_id 角色id
     */
    asyncGetKnapsack: async function (role_id) {
        const { results } = await asyncQuery(`select * from knapsack  where role_id="${role_id}"`);
        const data = results[0];
        if (data) {
            data.data = JSON.parse(data.data);
        }
        return data;
    },
    /**
     * 更新背包信息
     * @param {*} role_id 角色id
     * @param {*} data 
     */
    asyncUpdateKnapsack: async function (role_id, data) {
        const upData = [];
        Object.keys(data).forEach(key => {
            const value = KNAPSACK_JSON_KEY.includes(key) ? JSON.stringify(data[key]) : data[key];
            upData.push(`${key}='${value}'`);
        })
        const { results } = await asyncQuery(`update knapsack  SET ${upData.join(',')}  where role_id="${role_id}"`);
        return results[0];
    },
}
