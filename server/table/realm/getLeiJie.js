const leiJieMeun = require('./leiJieMeun');
module.exports = {
    /**
     * 获取雷劫信息
     * @param {number} leiJieId 雷劫ID
     */
    getLeiJie: function (leiJieId) {
        const data = leiJieMeun[leiJieId];
        return data ? JSON.parse(JSON.stringify(data)) : undefined
    }
}