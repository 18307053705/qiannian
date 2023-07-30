const config = require('./config');
const getDirGlobal = require('./getDirGlobal');
const setDirGlobal = require('./setDirGlobal');
module.exports = {
    ...config,
    ...getDirGlobal,
    ...setDirGlobal
}