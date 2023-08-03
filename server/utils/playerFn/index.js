const creatFight  = require('./creatFight');
const getDeathResulst  = require('./getDeathResulst');
const playerNormalDir  = require('./playerNormalDir');
const playerArtDir  = require('./playerArtDir');
const computeTime  = require('./computeTime');
const computeBuffs  = require('./computeBuffs');
const escapeFight  = require('./escapeFight');
module.exports = {
    ...creatFight,
    ...getDeathResulst,
    ...playerNormalDir,
    ...playerArtDir,
    ...computeTime,
    ...computeBuffs,
    ...escapeFight
}