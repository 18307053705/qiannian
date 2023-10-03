const creatFight = require('./creatFight');
const initRoundInfo = require('./initRoundInfo');
const playerAttack = require('./playerAttack');
const petAttack = require('./petAttack');
const rivalAttack = require('./rivalAttack');
const computeFightResults = require('./computeFightResults');
const getFightResults = require('./getFightResults');
const creatFightCheck = require('./creatFightCheck');
const releaseFight = require('./releaseFight');
const drugDir = require('./drugDir');
const lingXue = require('./lingXue');
const escapeFight = require('./escapeFight');
// const computeRivalResults = require('./computeFightResults/computeRivalResults');
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
    ...rivalAttack,
    ...computeFightResults,
    ...getFightResults,
    ...creatFightCheck,
    ...releaseFight,
    ...drugDir,
    ...lingXue,
    ...escapeFight
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