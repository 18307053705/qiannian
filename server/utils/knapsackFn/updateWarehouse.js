
const { RoleG, KnapsackG } = require("../../global");

module.exports = {
    /**
     * 更新仓库
     * @param {*} req 
     * @param {*} res
     * @param {*} data // 更新数据{data,yuanbao,teal}
     */
    updateWarehouse: async function (req, res, data) {
        const { role_id } = RoleG.getRoleGlobal(req, res);
        const upData = [];
        Object.keys(data).forEach(key => {
            const value = key === 'data' ? KnapsackG.saveSqlChang(data[key]) : data[key];
            upData.push(`${key}='${value}'`)
        })
        const { results } = await res.asyncQuery(`update warehouse  SET ${upData.join(',')}  where role_id="${role_id}"`);
        return results;
    },
}