const getRoleArtInfo = require('./getRoleArtInfo');
const artUpLevel = require('./artUpLevel');
// const artLevelCompute = require('./artLevelCompute');
const getUpArtMaterial = require('./getUpArtMaterial');


module.exports = {
    ...getRoleArtInfo,
    ...artUpLevel,
    // ...artLevelCompute,
    ...getUpArtMaterial,
}