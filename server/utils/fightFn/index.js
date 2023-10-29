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
const randomAttr = require('./initRoundInfo/randomAttr');
const computeFightDps = require('./computeFightDps');
const catchPet = require('./catchPet');


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
    ...escapeFight,
    ...randomAttr,
    ...computeFightDps,
    ...catchPet
}