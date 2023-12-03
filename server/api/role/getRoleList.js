const roleSql = require('@/mysql/roleSql')
module.exports = {
    /**
     * 获取角色列表 
     */
    getRoleList: async (req, res) => {
        const user = req.cookies["q_uid"];
        const list = await roleSql.asyncGetRoleList(user);
        res.send({
            code: 0,
            data: list
        });
    }
};