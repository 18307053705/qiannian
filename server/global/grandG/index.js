const config = require('./config');
const getDirGlobal = require('./getDirGlobal');
const setDirGlobal = require('./setDirGlobal');
const deleteDirGlobal = require('./deleteDirGlobal');
module.exports = {
    ...config,
    ...getDirGlobal,
    ...setDirGlobal,
    ...deleteDirGlobal
}