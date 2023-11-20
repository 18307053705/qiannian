const article = require('./article');
const getDataName = require('./getDataName');
const getKeyBackArticle = require('./getKeyBackArticle');
const getArticleListAll = require('./getArticleListAll');
const getSuit = require('./getSuit');

module.exports = {
    ...article,
    ...getDataName,
    ...getKeyBackArticle,
    ...getArticleListAll,
    ...getSuit
}