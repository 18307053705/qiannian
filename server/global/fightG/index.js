const getFightGlobal = require('./getFightGlobal');
const setFightGlobal = require('./setFightGlobal');
const updataFightGlobal = require('./updataFightGlobal');
module.exports = {
    ...getFightGlobal,
    ...setFightGlobal,
    ...updataFightGlobal,

}