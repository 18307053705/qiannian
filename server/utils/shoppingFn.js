const mysql = require("../mysql");
const Global = require("../global");
module.exports = {
    // 获取店铺信息
    getShopInfo: async function (req, role_id) {
        const { role } = Global.getUserRole(req);
        const { results } = await mysql.asyncQuery(`select * from shop  where role_id="${role_id || role.id}"`);
        if(results[0]){
            return {
                ...results[0],
                article:JSON.parse(results[0]['article']),
                pet:JSON.parse(results[0]['pet']),
            }
        }
        return {};
    },
    // 修改店铺信息
    updataShopInfo: async function (req, data) {
        const { role_id } = req.body;
        const { role } = Global.getUserRole(req);
        const upData = [];
        Object.keys(data).forEach(key => {
            upData.push(`${key}='${data[key]}'`)
        })
        const { results } = await mysql.asyncQuery(`update shop  SET ${upData.join(',')}  where role_id="${role_id || role.id}"`);
        return results;
    },
}