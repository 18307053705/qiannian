const { decrypt } = require('./decrypt');
const { encryption } = require('./encryption');

module.exports = {
    ...encryption,
    ...decrypt,
}