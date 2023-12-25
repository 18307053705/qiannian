const { RoleSql } = require('@/mysql');
const { ROLE_Global } = require('./config');

module.exports = {
    /**
     * 保存角色至数据库
     * @param {*} req
     * @param {*} res 
     * @param {*} userId 账号id,可选
     * 
     */
    saveRoleSql: async function (req, res, userId) {
        const user = userId || req.cookies["q_uid"];
        const { updateKeys, ...roleInfo } = ROLE_Global[user];
        const data = {};
        [...new Set(updateKeys)].forEach((key) => {
            data[key] = roleInfo[key];
        })
        if (JSON.stringify(data) !== '{}') {
            await RoleSql.asyncUpdateRole(roleInfo.role_id, data);
        }
        return;
    }

}