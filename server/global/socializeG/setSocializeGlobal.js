const { SOCIALIZE_Global } = require('./config');


module.exports = {
    /**
     * 设置全局势力信息
     * @param {*} req 
     * @param {*} res
     */
    setSocializeGlobal: function (req, res) {
        const { role_id, role_level, socialize_pool } = RoleG.getRoleGlobal(req, res);
        Object.keys(socialize_pool).forEach(key => {
            let keyName = `${socialize_pool[key].id}_${key}`;
            const socialize = SOCIALIZE_Global[keyName];
            if (socialize) {
                socialize['line'][role_id] = role_level;
                socialize['num'] += 1;
            } else {
                SOCIALIZE_Global[keyName] = {
                    line: {
                        [role_id]: role_level
                    },
                    buff: { text: 'buff', value: 0 },
                    num: 1
                }
            }
        })
    }

}