const getPrize = require('./getPrize');
const getMaterialMeun = require('./getMaterialMeun');
const gatherRate = require('./gatherRate');
module.exports = {
    ...getPrize,
    ...getMaterialMeun,
    ...gatherRate
}