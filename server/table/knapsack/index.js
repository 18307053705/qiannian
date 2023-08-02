const drugList = require('./drugList');
const getDrug = require('./getDrug');

module.exports = {
    ...drugList,
    ...getDrug
}