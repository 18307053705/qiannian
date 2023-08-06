const getRoleInfo = require('./getRoleInfo');
const getAddressPlayers = require('./getAddressPlayers');
const computeRoleAttr = require('./computeRoleAttr');
const roleExit = require('./roleExit');
const computeRoleLevel = require('./computeRoleLevel');
const computeUpExp = require('./computeUpExp');
const updataRoleInfo = require('./updataRoleInfo');

module.exports = {
    ...getRoleInfo,
    ...getAddressPlayers,
    ...computeRoleAttr,
    ...roleExit,
    ...computeRoleLevel,
    ...computeUpExp,
    ...updataRoleInfo
}