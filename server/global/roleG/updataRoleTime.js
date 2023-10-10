const { ROLE_Global, ROLE_JSON_KEYS } = require('./config');

module.exports = {
    /**
     * 更新角色在线时间
     * @param {*} req
     * @param {*} res 
     * 
     */
    updataRoleTime: function (req, res) {
        const user = req.cookies["q_uid"];
        if (ROLE_Global[user]) {
            ROLE_Global[user]['time'] = new Date() * 1;
        }
    }

}