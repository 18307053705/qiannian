const { RoleG } = require("../../global");
const { ROLE_JSON_KEYS } = require("../../global/roleG");
module.exports = {
    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @param {*} data 可选参数
     * @param {*} data.role_id 角色id
     * @param {*} data.attr 需要的属性
     * @returns {*} roleInfo|undefined
     * 
     */
    getRoleInfo: async function (req, res, { role_id, attr } = {}) {
        const roleInfo = RoleG.getRoleGlobal(req, res, { role_id });
        if (roleInfo) {
            return roleInfo;
        }
        const { results } = await res.asyncQuery(`select * from role where role_id="${role_id}"`);
        if (results[0]) {
            const role = {}
            Object.keys(results[0]).forEach((key) => {
                role[key] = ROLE_JSON_KEYS.includes(key) ? JSON.parse(results[0][key]) : results[0][key]
            })
            return role;
        }
        return results[0];
    }
};
