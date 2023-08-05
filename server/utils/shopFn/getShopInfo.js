const { RoleG } = require("../../global");
module.exports = {
    /**
     * 获取店铺信息
     * @param {*} req 
     * @param {*} res 
     * @param {*} roleId 可选参数
     * @returns Promise<article,pet>
     */
    getShopInfo: async function (req, res, roleId) {
        const { role_id } = RoleG.getRoleGlobal(req, res);
        const { results } = await res.asyncQuery(`select * from shop  where role_id="${roleId || role_id}"`);
        if (results[0]) {
            return {
                ...results[0],
                article: JSON.parse(results[0]['article']),
                pet: JSON.parse(results[0]['pet']),
            }
        }
        return {};
    }
}