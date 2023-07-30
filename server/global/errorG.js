const ERR_MEUN = {
    LOGIN_ERROR: 100000,
    ROLE_ERROR: 100001,
    PARAMS_ERROR: 100002,
    PASS_ERROR: 100005,
    UNKNOWN_ERROR: 100006,
};
const ERROR_TYPE = {
    [ERR_MEUN.LOGIN_ERROR]: "登录态异常,请重新登录!",
    [ERR_MEUN.ROLE_ERROR]: "角色信息异常!",
    [ERR_MEUN.PARAMS_ERROR]: "参数错误!",
    [ERR_MEUN.PASS_ERROR]: "登录失败:账号或密码有误",
    [ERR_MEUN.PASS_ERROR]: "登录失败:账号或密码有误",
    [ERR_MEUN.UNKNOWN_ERROR]: "错误操作",
};

/**
 * 登录异常报错
 * @param {*} res 
 */
function loginError(res) {
    res.send({
        code: ERR_MEUN.ROLE_ERROR,
        message: ERROR_TYPE.ROLE_ERROR
    });
}

/**
 * 角色异常报错
 * @param {*} res 
 */
function roleError(res) {
    res.send({
        code: ERR_MEUN.ROLE_ERROR,
        message: ERROR_TYPE.ROLE_ERROR
    });
}

/**
 * 参数报错
 * @param {*} res 
 */
function paramsError(res) {
    res.send({
        code: ERR_MEUN.ROLE_ERROR,
        message: ERROR_TYPE.ROLE_ERROR
    });
}

/**
 * 错误操作
 * @param {*} res 
 */
function unknownError(res) {
    res.send({
        code: ERR_MEUN.UNKNOWN_ERROR,
        message: ERROR_TYPE.UNKNOWN_ERROR
    });
}


global.ErrorFn = {
    loginError,
    roleError,
    paramsError
}

