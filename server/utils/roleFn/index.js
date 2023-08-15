const getRoleInfo = require('./getRoleInfo');
const getAddressPlayers = require('./getAddressPlayers');
const computeRoleAttr = require('./computeRoleAttr');
const roleExit = require('./roleExit');
const roleLogin = require('./roleLogin');
const computeRoleLevel = require('./computeRoleLevel');
const computeUpExp = require('./computeUpExp');
const updataRoleInfo = require('./updataRoleInfo');

module.exports = {
    ...getRoleInfo,
    ...getAddressPlayers,
    ...computeRoleAttr,
    ...roleExit,
    ...roleLogin,
    ...computeRoleLevel,
    ...computeUpExp,
    ...updataRoleInfo
}