const articleList = require('./articleList');
const equipList = require('./equipList');

module.exports = {
    /**
     * 获取物品
     * @param {*} articleId 物品id
     * @param {*} p 物品类型
     * @returns {*} article || undefined
     * @returns {*} article.id
     * @returns {*} article.n
     * @returns {*} article.type 
     * @returns {*} article.group1 || group2
     */
    getDataName: function (articleId, p) {
        if (p === 3) {
            return equipList[articleId]['name'];
        }
        return articleList[articleId]['n'];
    }
}