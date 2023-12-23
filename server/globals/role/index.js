const { ROLE_JSON_KEYS } = require('./config');
const getRoleGlobal = require('./getRoleGlobal');
const setRoleGlobal = require('./setRoleGlobal');
const updataRoleGlobal = require('./updataRoleGlobal');
const deleteRoleGlobal = require('./deleteRoleGlobal');
const saveRoleSql = require('./saveRoleSql');
const getRoleAllGlobal = require('./getRoleAllGlobal');
const updataRoleTime = require('./updataRoleTime');
const getRoleBase = require('./getRoleBase');

global.RoleG = {
    ROLE_JSON_KEYS,
    ...getRoleGlobal,
    ...setRoleGlobal,
    ...updataRoleGlobal,
    ...deleteRoleGlobal,
    ...saveRoleSql,
    ...getRoleAllGlobal,
    ...updataRoleTime,
    ...getRoleBase
}
