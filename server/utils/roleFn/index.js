const asyncGetRoleInfo = require('./asyncGetRoleInfo');
const getAddressPlayers = require('./getAddressPlayers');
const roleExit = require('./roleExit');
const roleLogin = require('./roleLogin');
const computeRoleLevel = require('./computeRoleLevel');
const computeUpExp = require('./computeUpExp');
const updataRoleInfo = require('./updataRoleInfo');

module.exports = {
    ...asyncGetRoleInfo,
    ...getAddressPlayers,
    ...roleExit,
    ...roleLogin,
    ...computeRoleLevel,
    ...computeUpExp,
    ...updataRoleInfo
}