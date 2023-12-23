const ERROR_MEUN = {
    LOGIN_ERROR: 100000,
    ROLE_ERROR: 100001,
    PARAMS_ERROR: 100002,
    PASS_ERROR: 100005,
    UNKNOWN_ERROR: 100006,
};
const ERROR_TYPE = {
    [ERROR_MEUN.LOGIN_ERROR]: "登录态异常,请重新登录!",
    [ERROR_MEUN.ROLE_ERROR]: "角色信息异常!",
    [ERROR_MEUN.PARAMS_ERROR]: "参数错误!",
    [ERROR_MEUN.PASS_ERROR]: "登录失败:账号或密码有误",
    [ERROR_MEUN.PASS_ERROR]: "登录失败:账号或密码有误",
    [ERROR_MEUN.UNKNOWN_ERROR]: "错误操作",
};

module.exports = {
    ERROR_MEUN,
    ERROR_TYPE
}

