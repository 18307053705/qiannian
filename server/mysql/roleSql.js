const { asyncQuery, asyncAdd } = require('./config');
module.exports = {
    /**
    * 获取角色列表
    * @param {*} req 账号
    */
    asyncGetRoleList: async function (req) {
        const user = req.cookies["q_uid"];
        const region = req.cookies["region"];
        const { results } = await asyncQuery(`select * from role  where user_id="${user}" and region="${region}"`);
        return results;
    },
    /**
     * 获取角色信息
     * @param {*} role_id 角色id
     */
    asyncGetRoleInfo: async function (role_id) {
        const { results } = await asyncQuery(`select * from role  where role_id="${role_id}"`);
        return results[0];
    },
    /**
    * 获取角色名称是否存在
    * @param {*} role_name 角色名称
    */
    asyncGetRoleName: async function (req, res, role_name) {
        const region = req.cookies["region"];
        const { results } = await asyncQuery(`select * from role  where role_name="${role_name}" and region="${region}"`);
        return results[0];
    },
    /**
     * 获取自身角色信息
     * @param {*} req 
     */
    asyncGetSelfRoleInfo: async function (req) {
        const user = req.cookies["q_uid"];
        const { role_id } = req.body;
        const { results } = await asyncQuery(`select * from role  where user_id="${user}" and role_id="${role_id}"`);
        return results[0];
    },
}
