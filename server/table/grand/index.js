const getGrandInfo = require('./getGrandInfo');
const getGrandName = require('./getGrandName');
module.exports = {
    ...getGrandInfo,
    ...getGrandName
};