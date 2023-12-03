const { asyncQuery, asyncAdd } = require('./config');
module.exports = {
    /**
    * 添加背包信息
    * @param {*} user 账号
    * @param {*} role_id 角色id
    */
    asyncAddKnapsack: async function (user, role_id) {
        const knapsackSql = "insert into knapsack(user_id,role_id,tael,yuanbao,data) values(?,?,?,?,?)";
        const knapsackData = [user, role_id, 1000, 0, '[]'];
        const { results } = await asyncAdd(knapsackSql, knapsackData);
        return results.insertId;;
    },
    /**
     * 获取自身背包信息
     * @param {*} req 
     */
    asyncGetSelfKnapsack: async function (req) {
        const user = req.cookies["q_uid"];
        const { role_id } = req.body;
        const { results } = await asyncQuery(`select * from knapsack  where user_id="${user}" and role_id="${role_id}"`);
        return results[0];
    },
    /**
     * 获取自身背包信息
     * @param {*} role_id 
     */
    asyncGetKnapsack: async function (role_id) {
        const { results } = await asyncAdd(`select * from knapsack  where role_id="${role_id}"`);
        return results[0];
    },
}
