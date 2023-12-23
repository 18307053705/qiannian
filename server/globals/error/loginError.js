const { ERROR_MEUN, ERROR_TYPE } = require('./config');
module.exports = {
    /**
     * 登录异常报错
     * @param {*} res 
     */
    loginError: function (res) {
        res.clearCookie('q_uid');
        res.clearCookie('token');
        res.clearCookie('q_m');
        res.send({
            code: ERROR_MEUN.LOGIN_ERROR,
            message: ERROR_TYPE[ERROR_MEUN.LOGIN_ERROR]
        });
    }
}