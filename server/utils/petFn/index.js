const setPet = require('./setPet');
const getPetInfo = require('./getPetInfo');
const updataPetInfo = require('./updataPetInfo');
const computePetAttr = require('./computePetAttr');

module.exports = {
    ...setPet,
    ...getPetInfo,
    ...updataPetInfo,
    ...computePetAttr
}