const getArticle = require('./getArticle');
const getEquip = require('./getEquip');

module.exports = {
    ...getArticle,
    ...getEquip
}