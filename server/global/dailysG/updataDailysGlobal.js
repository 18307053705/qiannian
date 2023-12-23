const { DAILYS_Global } = require('./config');

module.exports = {
    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @param {*} data 更新的数据
     * @param {*} roleId 可选参数
     */
    updataDailysGlobal: function (req, res, data, roleId) {
        const { role_id } = roleId ? { role_id: roleId } : RoleG.getRoleGlobal(req, res);
        const dailys = {
            ...DAILYS_Global[role_id],
            ...data
        }
        DAILYS_Global[role_id] = dailys;
        return JSON.parse(JSON.stringify(dailys));
    }
}