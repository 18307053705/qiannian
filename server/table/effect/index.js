const group1Fn = require('./group1Fn');
const group2Fn = require('./group2Fn');


module.exports = {
    ...group1Fn,
    ...group2Fn,
}