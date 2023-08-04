const { RoleG } = require("../../global");


module.exports = {
    /**
     * 角色传送
     * @param {*} req 
     * @param {*} res 
     * @param {*} dir 地图指令即传送坐标 
     * @returns {*} address 返回坐标
     */
    tpDir: function (req, res, dir) {
        const { address } = RoleG.getRoleGlobal(req, res);
        if (address !== dir) {
            RoleG.updataRoleGlobal(req, res, { address: dir });
        }
        return dir;
    },

};
