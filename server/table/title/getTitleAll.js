const titleMeun = require('./titleMeun');


module.exports = {
    /**
     * 获取全部称号
     */
    getTitleAll: function () {
        return JSON.parse(JSON.stringify(titleMeun));
    }
}