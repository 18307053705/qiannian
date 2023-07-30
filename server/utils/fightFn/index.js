const creatFight = require('./creatFight');
const creatFreak = require('./creatFreak');
const creatPlayer = require('./creatPlayer');

module.exports = {
    ...creatFight,
    ...creatFreak,
    ...creatPlayer
}