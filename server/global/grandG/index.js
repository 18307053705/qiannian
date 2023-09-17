const config = require('./config');
const getDirGlobal = require('./getDirGlobal');
const setDirGlobal = require('./setDirGlobal');
const deleteDirGlobal = require('./deleteDirGlobal');
const getGrandEleGlobal = require('./getGrandEleGlobal');
const setGrandEleGlobal = require('./setGrandEleGlobal');
const deteleGrandEleGlobal = require('./deteleGrandEleGlobal');
const setCurrentDir = require('./setCurrentDir');
module.exports = {
    ...config,
    ...getDirGlobal,
    ...setDirGlobal,
    ...deleteDirGlobal,
    ...setGrandEleGlobal,
    ...getGrandEleGlobal,
    ...deteleGrandEleGlobal,
    ...setCurrentDir
}