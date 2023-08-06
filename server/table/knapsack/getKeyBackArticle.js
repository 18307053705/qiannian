const articleList = require('./articleList');
const equipList = require('./equipList');

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
    getKeyBackArticle: function (key, value, p) {
        const article = p === 3 ? Object.values(equipList) : Object.values(articleList);
        return article.find((itme) => (itme[key] == value))
    }
}