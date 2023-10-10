const config = require('./config');
const getRoleGlobal = require('./getRoleGlobal');
const setRoleGlobal = require('./setRoleGlobal');
const updataRoleGlobal = require('./updataRoleGlobal');
const deleteRoleGlobal = require('./deleteRoleGlobal');
const saveRoleSql = require('./saveRoleSql');
const getRoleAllGlobal = require('./getRoleAllGlobal');
const updataRoleTime = require('./updataRoleTime');


module.exports = {
    ...config,
    ...getRoleGlobal,
    ...setRoleGlobal,
    ...updataRoleGlobal,
    ...deleteRoleGlobal,
    ...saveRoleSql,
    ...getRoleAllGlobal,
    ...updataRoleTime
}