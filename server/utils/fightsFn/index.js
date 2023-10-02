const creatFight = require('./creatFight');
const initRoundInfo = require('./initRoundInfo');
const playerAttack = require('./playerAttack');
const petAttack = require('./petAttack');
const rivalAttack = require('./rivalAttack');
// const creatFreak = require('./creatFreak');
// const creatPlayer = require('./creatPlayer');
// const releaseFight = require('./releaseFight');
// const creatFightAttr = require('./creatFightAttr');
// const computeFightDps = require('./computeFightDps');
// const playerNormalDir = require('./playerNormalDir');
// const getFightResults = require('./getFightResults');
// const getFightReward = require('./getFightReward');
// const drugDir = require('./drugDir');
// const playerArtDir = require('./playerArtDir');
// const computeBuffs = require('./computeBuffs');
// const catchPet = require('./catchPet');
// const rivalNormalDir = require('./rivalNormalDir');
// const lingXue = require('./lingXue');
// const checkContinueFight = require('./checkContinueFight');
// const petArtDir = require('./petArtDir');


module.exports = {
    ...creatFight,
    ...playerAttack,
    ...initRoundInfo,
    ...petAttack,
    ...rivalAttack
    // ...creatFreak,
    // ...creatPlayer,
    // ...releaseFight,
    // ...creatFightAttr,
    // ...computeFightDps,
    // ...playerNormalDir,
    // ...getFightResults,
    // ...getFightReward,
    // ...drugDir,
    // ...playerArtDir,
    // ...computeBuffs,
    // ...catchPet,
    // ...rivalNormalDir,
    // ...lingXue,
    // ...checkContinueFight,
    // ...petArtDir
}