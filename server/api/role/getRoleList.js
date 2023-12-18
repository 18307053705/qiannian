const roleSql = require('@/mysql/roleSql')
module.exports = {
    /**
     * 获取角色列表 
     */
    getRoleList: async (req, res) => {
        const list = await roleSql.asyncGetRoleList(req,res);
        res.send({
            code: 0,
            data: list
        });
    }
};