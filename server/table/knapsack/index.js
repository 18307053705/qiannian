const article = require('./article');
const getDataName = require('./getDataName');
const getGemInfo = require('./getGemInfo');
const getSuit = require('./getSuit');
const synthesis = require('./synthesis');

module.exports = {
    ...article,
    ...getDataName,
    ...getGemInfo,
    ...getSuit,
    ...synthesis
}