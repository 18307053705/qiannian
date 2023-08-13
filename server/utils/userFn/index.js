const checkToken = require('./checkToken');
const creatToken = require('./creatToken');
const decryptPass = require('./decryptPass');
const encryptionPass = require('./encryptionPass');

module.exports = {
    ...checkToken,
    ...creatToken,
    ...decryptPass,
    ...encryptionPass,
}