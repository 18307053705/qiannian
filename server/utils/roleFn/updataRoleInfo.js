const { RoleSql } = require('@/mysql');
module.exports = {
    /**
     * 更新角色信息
     * @param {*} req 
     * @param {*} res 
     * @param {*} data 可选参数
     * @param {*} role_id 角色id
     * @returns {*} roleInfo|undefined
     * 
     */
    updataRoleInfo: async function (req, res, data, role_id) {
        // 判断角色是否在线
        if (RoleG.getRoleGlobal(req, res, role_id)) {
            RoleG.updataRoleGlobal(req, res, data, role_id)
            return;
        }
        return RoleSql.asyncUpdateRole(role_id, data);
    }
};
