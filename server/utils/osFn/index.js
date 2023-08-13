const getIPAdress = require('./getIPAdress');
const getMacAdress = require('./getMacAdress');

module.exports = {
    ...getIPAdress,
    ...getMacAdress,
}