const getArticle = require('./getArticle');
const getEquip = require('./getEquip');
const getDataName = require('./getDataName');
const getKeyBackArticle = require('./getKeyBackArticle');

module.exports = {
    ...getArticle,
    ...getEquip,
    ...getDataName,
    ...getKeyBackArticle
}