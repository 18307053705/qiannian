module.exports = {
    /**
     * 角色传送，且返回地图
     * @param {*} req 
     * @param {*} res 
     * @param {*} dir 地图指令即传送坐标 
     */
    tpDirUpdate: function (req, res, dir) {
        const { address } = RoleG.getRoleGlobal(req, res);
        if (dir && address !== dir) {
            RoleG.updataRoleGlobal(req, res, { address: dir });
        }
        res.send({
            code: 0,
            path: '/grand'
        })
    },

};
