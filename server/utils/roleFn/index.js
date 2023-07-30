const getRoleInfo = require('./getRoleInfo');
const getAddressPlayers = require('./getAddressPlayers');
const computeRoleAttr = require('./computeRoleAttr');
const roleExit = require('./roleExit');

module.exports = {
    ...getRoleInfo,
    ...getAddressPlayers,
    ...computeRoleAttr,
    ...roleExit,
}