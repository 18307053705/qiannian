const mysql = require("../mysql");
const JSON_KEYS = [
    'equip_pool',
    'socialize_pool',
    'skill_pool',
    'base_pool',
    'addition_pool',
    'buff_pool',
    'reputation_pool',
    'task_pool',
    'can_task_pool',
    'role_attr',
    'role_buff',
    'pet_pool',
    'role_integral',
    'treasure_pool'
];

module.exports = {
    JSON_KEYS,
    roleGlobal: {
        // key：账号 { id:role_id,...role,updateKeys:[] }
        // updateKeys 记录更新key,判断角色退出后是否需要更新，避免无端操作数据库
    },
    // 设置角色全局信息
    setRoleGlobal: function (req, role) {
        const user = req.cookies["q_uid"];
        const roleInfo = {
            time: new Date() * 1, // 角色操作时间，长时间没有操作，即自动下线
            updateKeys: [],

        };
        Object.keys(role).forEach((key) => {
            roleInfo[key] = JSON_KEYS.includes(key) ? JSON.parse(role[key]) : role[key]
        })
        this.roleGlobal[user] = {
            ...roleInfo,
            id: role.role_id
        };

    },
    // 获取角色全局信息
    getRoleGlobal: function (req, role_id) {
        const user = req.cookies["q_uid"];
        let role = undefined;
        // 获取其他玩家信息
        if (role_id) {
            const userKey = Object.keys(this.roleGlobal).find((key) => this.roleGlobal[key].role_id === role_id);
            role = userKey ? this.roleGlobal[userKey] : undefined
        } else {
            role = this.roleGlobal[user];
        }
        return role ? JSON.parse(JSON.stringify(role)) : undefined;
    },
    // 更新角色全局信息
    updateRoleGlobal: function (req, data, role_id) {
        const user = req.cookies["q_uid"];
        let updateKeys = Object.keys(data);
        let roleInfo = undefined;
        // 存在代表为操作其他玩家角色
        if (role_id) {
            const userKey = Object.keys(this.roleGlobal).find((key) => this.roleGlobal[key].role_id === role_id);
            roleInfo = userKey ? this.roleGlobal[userKey] : undefined
        } else {
            roleInfo = this.roleGlobal[user];
        }
        if (roleInfo) {
            this.roleGlobal[roleInfo.user_id] = {
                ...roleInfo,
                ...data,
                updateKeys: [...roleInfo.updateKeys,...updateKeys]
            };
        }
        
        return roleInfo;
    },
    // 更新角色访问时间
    updateRoleTime: function (req) {
        const user = req.cookies["q_uid"];
        if (this.roleGlobal[user]) {
            this.roleGlobal[user]['time'] = new Date() * 1;
        } else {
            return true;
        }
    },
    // 角色释放，信息保存到数据库
    saveRole: async function (userid) {
        const { updateKeys, ...roleInfo } = this.roleGlobal[userid];
        const data = [];
        [...new Set(updateKeys)].forEach((key) => {
            const value = JSON_KEYS.includes(key) ? JSON.stringify(roleInfo[key]) : roleInfo[key];
            data.push(`${key}='${value}'`)
        })
        if (data.length) {
            await mysql.asyncQuery(`update role  SET ${data.join(',')}  where role_id="${roleInfo.role_id}"`);
        }
        return;
    }
}
