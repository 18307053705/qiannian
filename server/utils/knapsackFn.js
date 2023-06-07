const Global = require("../global");
const mysql = require("../mysql");
module.exports = {
    getKnapsackInfo: async function (req, type) {
        const { role, user } = Global.getUserRole(req);
        // 背包
        if (type == 1 || type == 2 || type == 4 || type == 5) {
            const { results } = await mysql.asyncQuery(`select * from knapsack  where user_id="${user}" and role_id="${role.id}"`);
            const data = JSON.parse(results[0].data);
            return {
                ...results[0],
                data
            };
        }
        if (type == 3) {
            const { results } = await mysql.asyncQuery(`select * from warehouse  where user_id="${user}" and role_id="${role.id}"`);
            const data = JSON.parse(results[0].data);
            return {
                ...results[0],
                data
            };
        }
    },
    // 更新背包
    updateKnapsack: async function (req, data) {
        const { role, user } = Global.getUserRole(req);
        const upData = [];
        Object.keys(data).forEach(key => {
            upData.push(`${key}='${data[key]}'`)
        })
        const { results } = await mysql.asyncQuery(`update knapsack  SET ${upData.join(',')}  where user_id="${user}" and role_id="${role.id}"`);
        return results;
    },
    // 更新仓库
    updateWarehouse: async function (req, data) {
        const { role, user } = Global.getUserRole(req);
        const upData = [];
        Object.keys(data).forEach(key => {
            upData.push(`${key}='${data[key]}'`)
        })
        const { results } = await mysql.asyncQuery(`update warehouse  SET ${upData.join(',')}  where user_id="${user}" and role_id="${role.id}"`);
        return results;
    },
    // 验证物品信息
    chekeArticle: function (req, data) {
        const { id, in_x, s, p, type } = req.body;
        if (!id || in_x === undefined || !s || !p || !type) {
            return '参数有误'
        }
        const itme = data[in_x];
        if (itme && itme.id != id && itme.p != p && itme.s < s) {
            return '物品信息有误'
        }
        return false;
    },


}