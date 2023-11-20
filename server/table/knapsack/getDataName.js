const { getArticle } = require('./article');

module.exports = {
    /**
     * 获取物品
     * @param {*} articleId 物品id
     * @param {*} p 物品类型
     * @returns {*} n 物品名称
     */
    getDataName: function (articleId) {
        const article = getArticle(articleId);
        return article ? article.n : '';
    }
}