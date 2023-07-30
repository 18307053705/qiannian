const { ROLE_Global, ROLE_JSON_KEYS } = require('./config');

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
        const data = [];
        [...new Set(updateKeys)].forEach((key) => {
            const value = ROLE_JSON_KEYS.includes(key) ? JSON.stringify(roleInfo[key]) : roleInfo[key];
            data.push(`${key}='${value}'`)
        })
        if (data.length) {
            await res.asyncQuery(`update role  SET ${data.join(',')}  where role_id="${roleInfo.role_id}"`);
        }
        return;
    }

}