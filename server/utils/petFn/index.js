const setPet = require('./setPet');
const getPetInfo = require('./getPetInfo');
const computePetAttr = require('./computePetAttr');
const computePetLevel = require('./computePetLevel');

module.exports = {
    ...setPet,
    ...getPetInfo,
    ...computePetAttr,
    ...computePetLevel
}