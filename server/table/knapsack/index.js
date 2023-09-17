const getArticle = require('./getArticle');
const getEquip = require('./getEquip');
const getDataName = require('./getDataName');
const getKeyBackArticle = require('./getKeyBackArticle');
const getArticleListAll = require('./getArticleListAll');

module.exports = {
    ...getArticle,
    ...getEquip,
    ...getDataName,
    ...getKeyBackArticle,
    ...getArticleListAll
}