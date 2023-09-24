
const articleList = require('./articleList');
const equipList = require('./equipList');

module.exports = {
    /**
     * 获取物品列表
     * @param {*} type 1:物品 2 装备
     */
    getArticleListAll: function (type = 1) {
        if (type === 1) {
            return JSON.parse(JSON.stringify(articleList))
        }
        if (type === 2) {
            return JSON.parse(JSON.stringify(equipList))
        }
    }
}