const { RoleG } = require("../../global");
module.exports = {
    /**
     * 修改店铺信息
     * @param {*} req 
     * @param {*} res 
     * @param {*} data 更新数据
     * @param {*} roleId 可选参数
     * @returns Promise
     */
    updataShopInfo: async function (req, res, data, roleId) {
        const { role_id } = RoleG.getRoleGlobal(req, res);
        const upData = [];
        Object.keys(data).forEach(key => {
            upData.push(`${key}='${data[key]}'`)
        })
        const { results } = await res.asyncQuery(`update shop  SET ${upData.join(',')}  where role_id="${roleId || role_id}"`);
        return results;
    },
}