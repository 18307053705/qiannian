const { GRAND_Global } = require('./config');


module.exports = {
    /**
     * 释放全局指令
     * @param {*} req 
     * @param {*} res 
     */
    deleteDirGlobal: function (req, res) {
        const { role_id } = RoleG.getRoleGlobal(req, res);
        delete GRAND_Global[role_id];
    }

}