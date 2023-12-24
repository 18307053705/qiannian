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
        const results = await roleSql.asyncGetRoleInfo(role_id);
        if (results) {
            const role = {}
            const { ROLE_JSON_KEYS } = RoleG;
            Object.keys(results).forEach((key) => {
                role[key] = ROLE_JSON_KEYS.includes(key) ? JSON.parse(results[key]) : results[key]
            })
            return role;
        }
    }
};
