const { asyncQuery, asyncAdd } = require('./config');
const KNAPSACK_JSON_KEY = ['data'];
module.exports = {
    /**
    * 添加背包信息
    * @param {*} user 账号
    * @param {*} role_id 角色id
    */
    asyncAddKnapsack: async function (req, user, role_id, name) {
        const region = req.cookies["region"];
        const sqlStr = "insert into knapsack(user_id,role_id,name,tael,yuanbao,data,region) values(?,?,?,?,?,?,?)";
        const list = [user, role_id, name, 1000, 0, '[]', region];
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
    /**
   * 获取全区背包
   * @param {*} req
   */
    asyncGetRegionKnapsack: async function (req) {
        const region = req.cookies["region"];
        // const { results } = await asyncQuery(`select * from knapsack  where region="${region}" `);
        const { results } = await asyncQuery(`select * from knapsack`);
        return results;
    },
}
