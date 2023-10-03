const { FIGHT_TYPE } = require('./config');
const getFightGlobal = require('./getFightGlobal');
const setFightGlobal = require('./setFightGlobal');
const updataFightInfoGlobal = require('./updataFightInfoGlobal');
const updataFightMapGlobal = require('./updataFightMapGlobal');
const deleteFightInfoGlobal = require('./deleteFightInfoGlobal');
const deleteFightMapGlobal = require('./deleteFightMapGlobal');
const getFightInfo = require('./getFightInfo');
const getFightMap = require('./getFightMap');
module.exports = {
    ...getFightGlobal,
    ...setFightGlobal,
    ...updataFightInfoGlobal,
    ...updataFightMapGlobal,
    ...deleteFightInfoGlobal,
    ...deleteFightMapGlobal,
    ...getFightInfo,
    ...getFightMap,
    FIGHT_TYPE,
}