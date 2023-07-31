const { ERROR_MEUN, ERROR_TYPE } = require('./config');
module.exports = {
    /**
     * 角色异常报错
     * @param {*} res 
     */
    roleError: function (res) {
        res.send({
            code: ERROR_MEUN.ROLE_ERROR,
            message: ERROR_TYPE.ROLE_ERROR
        });
    }
}