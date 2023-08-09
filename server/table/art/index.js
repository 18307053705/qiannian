const  artList = require('./artList');
const getCareerArts = require('./getCareerArts');
const getArt = require('./getArt');
const getArtMsg = require('./getArtMsg');

module.exports = {
    ...artList,
    ...getCareerArts,
    ...getArt,
    ...getArtMsg
}