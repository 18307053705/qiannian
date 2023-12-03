const { ROLE_Global } = require('./config');

module.exports = {
    /**
     * 获取角色全局信息
     * @param {*} req 
     * @param {*} res 
     * @param {*} updata 更新数据
     * @param {*} data 可选参数
     * @param {*} data.role_id 角色id
     * @param {*} data.attr 需要的属性
     * @returns {*} role|undefined
     */
    updataRoleGlobal: function (req, res, updata, role_id) {
        const user = req.cookies["q_uid"];
        let updateKeys = Object.keys(updata);
        let roleInfo = undefined;
        // 存在代表为操作其他玩家角色
        if (role_id) {
            const userKey = Object.keys(ROLE_Global).find((key) => ROLE_Global[key].role_id === role_id);
            roleInfo = userKey ? ROLE_Global[userKey] : undefined
        } else {
            roleInfo = ROLE_Global[user];
        }
        if (roleInfo) {
            const role = {
                ...roleInfo,
                ...updata,
                updateKeys: [...roleInfo.updateKeys, ...updateKeys]
            }
            ROLE_Global[roleInfo.user_id] = role;
            return JSON.parse(JSON.stringify(role));
        }
        return undefined;
    }

}