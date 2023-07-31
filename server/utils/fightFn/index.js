const creatFight = require('./creatFight');
const creatFreak = require('./creatFreak');
const creatPlayer = require('./creatPlayer');
const releaseFight = require('./releaseFight');
const creatFightAttr = require('./creatFightAttr');
const computeFightDps = require('./computeFightDps');

module.exports = {
    ...creatFight,
    ...creatFreak,
    ...creatPlayer,
    ...releaseFight,
    ...creatFightAttr,
    ...computeFightDps
}