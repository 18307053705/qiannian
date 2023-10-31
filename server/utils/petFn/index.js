const setPet = require('./setPet');
const getPetInfo = require('./getPetInfo');
const updataPetInfo = require('./updataPetInfo');
const computePetAttr = require('./computePetAttr');
const computePetLevel = require('./computePetLevel');

module.exports = {
    ...setPet,
    ...getPetInfo,
    ...updataPetInfo,
    ...computePetAttr,
    ...computePetLevel
}