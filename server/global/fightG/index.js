const getFightGlobal = require('./getFightGlobal');
const setFightGlobal = require('./setFightGlobal');
const updataFightInfoGlobal = require('./updataFightInfoGlobal');
const updataFightMapGlobal = require('./updataFightMapGlobal');
module.exports = {
    ...getFightGlobal,
    ...setFightGlobal,
    ...updataFightInfoGlobal,
    ...updataFightMapGlobal,
}