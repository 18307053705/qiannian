const { RoleSql } = require('@/mysql');
module.exports = {
    /**
     * 获取角色列表 
     */
    getRoleList: async (req, res) => {
        const list = await RoleSql.asyncGetRoleList(req, res);
        res.send({
            code: 0,
            data: list.map(({ role_name, role_level, role_id, role_career }) => ({ role_name, role_level, role_id, role_career }))
        });
    }
};