const setPet = require('./setPet');
const getPetInfo = require('./getPetInfo');
const updataPetInfo = require('./updataPetInfo');

module.exports = {
    ...setPet,
    ...getPetInfo,
    ...updataPetInfo
}