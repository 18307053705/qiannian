const { checkToken } = require("../userFn/checkToken");
// 无需网关验证的请求
const whiteApiList = [
    "/api/user/login",
    "/api/user/register",
    "/api/meun/getMeunList"
];

module.exports = {
    /**
     * 校验验证登录态
     * @param {*} req
     * @param {*} res
     * @returns true 通过
     */
    checkLogin: function (req, res) {
        if (whiteApiList.includes(req.originalUrl)) {
            return true;
        }
        const token = req.cookies["token"];
        const user = req.cookies["q_uid"];
        const pass = req.cookies["q_m"];
        if(token && user && pass && checkToken(token, user, pass)){
            return true;
        }
        ErrorG.loginError(res);
        return false;
    }
};
