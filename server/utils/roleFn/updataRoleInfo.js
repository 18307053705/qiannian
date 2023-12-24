module.exports = {
    /**
     * 更新角色信息
     * @param {*} req 
     * @param {*} res 
     * @param {*} data 可选参数
     * @param {*} role_id 角色id
     * @returns {*} roleInfo|undefined
     * 
     */
    updataRoleInfo: async function (req, res, data, role_id) {
        const { ROLE_JSON_KEYS } = RoleG;
        // 判断角色是否在线
        if (RoleG.getRoleGlobal(req, res, role_id)) {
            RoleG.updataRoleGlobal(req, res, data, role_id)
            return;
        }
        // 否则更新数据库
        const updata = [];
        Object.keys(data).forEach((key) => {
            const value = ROLE_JSON_KEYS.includes(key) ? JSON.stringify(data[key]) : data[key];
            updata.push(`${key}='${value}'`)
        })
        const { results } = await res.asyncQuery(`update role  SET ${updata.join(',')}  where role_id="${role_id}"`);
        return results[0];
    }
};
