const { RoleG } = require("../../global");
const { ROLE_JSON_KEYS } = require("../../global/roleG");
const roleSql = require("@/mysql/roleSql");
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
    asyncGetRoleInfo: async function (req, res, role_id) {
        const roleInfo = RoleG.getRoleGlobal(req, res, role_id);
        if (roleInfo) {
            return roleInfo;
        }
        const results = roleSql.asyncGetRoleInfo(role_id);
        if (results[0]) {
            const role = {}
            Object.keys(results[0]).forEach((key) => {
                role[key] = ROLE_JSON_KEYS.includes(key) ? JSON.parse(results[0][key]) : results[0][key]
            })
            return role;
        }
    }
};
