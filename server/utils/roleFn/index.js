const getRoleInfo = require('./getRoleInfo');
const getAddressPlayers = require('./getAddressPlayers');
const computeRoleAttr = require('./computeRoleAttr');
const roleExit = require('./roleExit');
const computeRoleLevel = require('./computeRoleLevel');
const computeUpExp = require('./computeUpExp');

module.exports = {
    ...getRoleInfo,
    ...getAddressPlayers,
    ...computeRoleAttr,
    ...roleExit,
    ...computeRoleLevel,
    ...computeUpExp,
}