const setPet = require('./setPet');
const getPetInfo = require('./getPetInfo');

module.exports = {
    ...setPet,
    ...getPetInfo
}