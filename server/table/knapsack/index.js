const article = require('./article');
const getDataName = require('./getDataName');
const getGemInfo = require('./getGemInfo');
const getArticleListAll = require('./getArticleListAll');
const getSuit = require('./getSuit');

module.exports = {
    ...article,
    ...getDataName,
    ...getGemInfo,
    ...getArticleListAll,
    ...getSuit
}