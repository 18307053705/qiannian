const { ROLE_Global } = require('./config');

module.exports = {
    /**
     * 释放全局角色池
     * @param {*} req
     * @param {*} res 
     * @param {*} userId 账号id,可选
     * 
     */
    deleteRoleGlobal: function (req, res, userId) {
        const user = userId || req.cookies["q_uid"];
        delete ROLE_Global[user];
    }

}