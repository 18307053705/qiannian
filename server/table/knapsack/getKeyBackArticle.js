const { getArticleList } = require('./article/17_gemstone');
module.exports = {
    /**
     * 根据某个字段值逆推物品信息
     * @param {*} key 字段
     * @param {*} value 值
     * @param {*} p 物品类型
     * @returns {*} article || undefined
     * @returns {*} article.id
     * @returns {*} article.n
     * @returns {*} article.type 
     * @returns {*} article.group1 || group2
     */
    getKeyBackArticle: function (value) {
        return getArticleList().find((itme) => (itme['gem'] == value))
    }
}