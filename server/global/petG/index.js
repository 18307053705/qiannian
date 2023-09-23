const getPetGlobal = require('./getPetGlobal');
const setPetGlobal = require('./setPetGlobal');
const updataPetGlobal = require('./updataPetGlobal');
const savePetSql = require('./savePetSql');
const { PET_JSON_KEYS } = require('./config');


module.exports = {
    PET_JSON_KEYS,
    ...getPetGlobal,
    ...setPetGlobal,
    ...updataPetGlobal,
    ...savePetSql,
}