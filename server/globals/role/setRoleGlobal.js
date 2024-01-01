const { ROLE_Global, ROLE_JSON_KEYS } = require('./config');
const integral_key = ['world', 'gang', 'intersect', 'exploit','shenZhuang'];
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
        Object.keys(role).forEach((key) => {
            roleInfo[key] = ROLE_JSON_KEYS.includes(key) ? JSON.parse(role[key]) : role[key]
        })

        // 声望处理
        integral_key.forEach((key) => {
            if (!roleInfo['role_integral'][key]) {
                roleInfo['role_integral'][key] = 0;
            }
        })
        ROLE_Global[user] = {
            ...roleInfo,
            id: role.role_id
        };
    }

}