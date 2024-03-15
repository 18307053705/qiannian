const realmMeun = require('./realmMeun');
module.exports = {
    /**
     * 获取全部境界枚举
     */
    getRealmMeun: function () {
        return JSON.parse(JSON.stringify(realmMeun));
    }
}