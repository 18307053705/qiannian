const artUpLevel = require('./artUpLevel');
const artLevelCompute = require('./artLevelCompute');
const getCareerArts = require('./getCareerArts');
const getArtMsg = require('./getArtMsg');

module.exports = {
    ...artUpLevel,
    ...artLevelCompute,
    ...getCareerArts,
    ...getArtMsg
}