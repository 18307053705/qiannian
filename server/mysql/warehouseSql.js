const { asyncQuery, asyncAdd } = require('./config');
const WAREHOUSE_JSON_KEY = ['data'];
module.exports = {
    /**
     * 新增仓库
     * @param {*} user 账号
     * @param {*} role_id 角色id
     */
    asyncAddWarehouse: async function (user, role_id) {
        const sqlStr = "insert into warehouse(user_id,role_id,tael,yuanbao,data) values(?,?,?,?,?)";
        const list = [user, role_id, 0, 0, '[]'];
        const { results } = await asyncAdd(sqlStr, list);
        return results.insertId;;
    },
    /**
     * 获取仓库
     * @param {*} role_id 角色id
     */
    asyncGetWarehouse: async function (role_id) {
        const { results } = await asyncQuery(`select * from warehouse  where role_id="${role_id}"`);
        const data = results[0];
        if (data) {
            data.data = JSON.parse(data.data);
        }
        return data;
    },
    /**
    * 更新仓库
    * @param {*} role_id 角色id
    * @param {*} data
    */
    asyncUpdateWarehouse: async function (role_id, data) {
        // 否则直接更新sql
        const upData = [];
        Object.keys(data).forEach(key => {
            const value = WAREHOUSE_JSON_KEY.includes(key) ? JSON.stringify(data[key]) : data[key];
            upData.push(`${key}='${value}'`);
        })
        const { results } = await asyncQuery(`update warehouse  SET ${upData.join(',')}  where role_id="${role_id}"`);
        return results[0];
    },
}