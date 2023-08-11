const articleList = require('./articleList');

module.exports = {
    /**
     * 获取物品
     * @param {*} articleId 物品id
     * @returns {*} article || undefined
     * @returns {*} article.id
     * @returns {*} article.n
     * @returns {*} article.type 
     * @returns {*} article.group1 || group2
     */
    getArticle: function (articleId) {
        const article = articleList[articleId];
        if(!article){
            console.log(`未找到物品:${id}`)
        }
        return article ? JSON.parse(JSON.stringify(article)) : undefined
    }
}