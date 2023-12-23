const { ERROR_MEUN, ERROR_TYPE } = require('./config');
module.exports = {
    /**
     * 参数报错
     * @param {*} res 
     */
    paramsError: function (res) {
        res.send({
            code: ERROR_MEUN.PARAMS_ERROR,
            message: ERROR_TYPE[ERROR_MEUN.PARAMS_ERROR]
        });
    }
}