const getSocializeGlobal = require('./getSocializeGlobal');
const setSocializeGlobal = require('./setSocializeGlobal');
const releaseSocializeGlobal = require('./releaseSocializeGlobal');

module.exports = {
    ...getSocializeGlobal,
    ...setSocializeGlobal,
    ...releaseSocializeGlobal
}