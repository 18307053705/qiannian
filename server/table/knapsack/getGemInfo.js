const { getArticleList } = require('./article/17_gemstone');
module.exports = {
    /**
     * 根据gem逆推对应的宝石信息
     */
    getGemInfo: function (value) {
        return getArticleList().find((itme) => (itme['gem'] == value))
    }
}