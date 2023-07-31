const getFightGlobal = require('./getFightGlobal');
const setFightGlobal = require('./setFightGlobal');
const updataFightInfoGlobal = require('./updataFightInfoGlobal');
const updataFightMapGlobal = require('./updataFightMapGlobal');
const deleteFightInfoGlobal = require('./deleteFightInfoGlobal');
const deleteFightMapGlobal = require('./deleteFightMapGlobal');
module.exports = {
    ...getFightGlobal,
    ...setFightGlobal,
    ...updataFightInfoGlobal,
    ...updataFightMapGlobal,
    ...deleteFightInfoGlobal,
    ...deleteFightMapGlobal,
}