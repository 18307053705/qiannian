const { ROLE_Global } = require('./config');

module.exports = {
    /**
     * 获取角色全局信息
     * @param {*} req 
     * @param {*} res 
     * @returns roles 全部角色信息
     * @returns iRole 自身信息
     */
    getRoleAllGlobal: function (req, res) {
        const user = req.cookies["q_uid"];
        return {
            roles: JSON.parse(JSON.stringify(ROLE_Global)),
            iRole: JSON.parse(JSON.stringify(ROLE_Global[user])),
        }

    }

}