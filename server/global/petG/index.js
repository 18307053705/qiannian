const getPetGlobal = require('./getPetGlobal');
const setPetGlobal = require('./setPetGlobal');
const updataPetGlobal = require('./updataPetGlobal');
const savePetSql = require('./savePetSql');


module.exports = {
    ...getPetGlobal,
    ...setPetGlobal,
    ...updataPetGlobal,
    ...savePetSql,
}