const { FIGHT_TYPE_EUNM, FIGHT_STATE_EUNM } = require('./config');
const setFightGlobal = require('./setFightGlobal');
const getFightGlobal = require('./getFightGlobal');
const deleteFightGlobal = require('./deleteFightGlobal');
const updataFightGlobal = require('./updataFightGlobal');
module.exports = {
    ...setFightGlobal,
    ...getFightGlobal,
    ...deleteFightGlobal,
    ...updataFightGlobal,
    FIGHT_TYPE_EUNM,
    FIGHT_STATE_EUNM,

}