const { ERROR_MEUN, ERROR_TYPE } = require('./config');
module.exports = {
    /**
     * 错误操作
     * @param {*} res 
     */
    unknownError: function (res) {
        res.send({
            code: ERROR_MEUN.UNKNOWN_ERROR,
            message: ERROR_TYPE[ERROR_MEUN.UNKNOWN_ERROR]
        });
    }
}