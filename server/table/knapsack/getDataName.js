const articleList = require('./articleList');
const equipList = require('./equipList');

module.exports = {
    /**
     * 获取物品
     * @param {*} articleId 物品id
     * @param {*} p 物品类型
     * @returns {*} n 物品名称
     */
    getDataName: function (articleId, p) {
        if (p === 3) {
            return equipList[articleId]['name'];
        }
        return articleList[articleId]['n'];
    }
}