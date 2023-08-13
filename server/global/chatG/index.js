
const snedSystem = require('./snedSystem');
const setChatReadGlobal = require('./getChatSocializeGlobal');
const getChatSocializeGlobal = require('./setChatReadGlobal');

module.exports = {
    ...snedSystem,
    ...getChatSocializeGlobal,
    ...setChatReadGlobal
}