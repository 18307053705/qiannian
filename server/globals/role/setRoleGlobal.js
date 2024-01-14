const { ROLE_Global } = require('./config');
// const integral_key = ['world', 'gang', 'intersect', 'exploit','shenZhuang'];
module.exports = {
    /**
     * 设置角色全局信息
     * @param {*} req
     * @param {*} res 
     * @param {*} role 角色信息
     * 
     */
    setRoleGlobal: function (req, res, role) {
        const user = req.cookies["q_uid"];
        const roleInfo = {
            time: new Date() * 1, // 角色操作时间，长时间没有操作，即自动下线
            updateKeys: [], // 更新过的key

        };
        ROLE_Global[user] = {
            ...role,
            ...roleInfo,
            id: role.role_id
        };
    }

}