const { ERROR_MEUN, ERROR_TYPE } = require('./config');
module.exports = {
    /**
     * 登录异常报错
     * @param {*} res 
     */
    loginError: function (res) {
        res.send({
            code: ERROR_MEUN.ROLE_ERROR,
            message: ERROR_TYPE.ROLE_ERROR
        });
    }
}