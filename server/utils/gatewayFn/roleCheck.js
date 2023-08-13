const { RoleG, ErrorG } = require("../../global");
// 无需角色验证的请求
const roleApiList = [
    "/api/user/login",
    "/api/user/register",
    "/api/meun/getMeunList",
    "/api/role/roleLogin",
    "/api/role/getRoleList",
    "/api/role/createRole",
];

module.exports = {
    /**
    * 角色验证
    * @param {*} req
    * @param {*} res
    * @returns true 通过
    */
    roleCheck: function (req, res) {
        if (roleApiList.includes(req.originalUrl) || RoleG.getRoleGlobal(req, res)) {
            return true;
        }
        ErrorG.roleError(res);
        return false;
    }
};
