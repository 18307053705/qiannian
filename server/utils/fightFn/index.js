const creatFight = require('./creatFight');
const creatFreak = require('./creatFreak');
const creatPlayer = require('./creatPlayer');
const releaseFight = require('./releaseFight');
const creatFightAttr = require('./creatFightAttr');
const computeFightDps = require('./computeFightDps');
const playerNormalDir = require('./playerNormalDir');
const getIsFightResults = require('./getIsFightResults');
const getFightReward = require('./getFightReward');


module.exports = {
    ...creatFight,
    ...creatFreak,
    ...creatPlayer,
    ...releaseFight,
    ...creatFightAttr,
    ...computeFightDps,
    ...playerNormalDir,
    ...getIsFightResults,
    ...getFightReward,
}