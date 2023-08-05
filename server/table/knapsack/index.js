const getArticle = require('./getArticle');
const getEquip = require('./getEquip');
const getDataName = require('./getDataName');

module.exports = {
    ...getArticle,
    ...getEquip,
    ...getDataName
}