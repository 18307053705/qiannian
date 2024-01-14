const { asyncQuery, asyncAdd } = require('./config');
const ROLE_JSON_KEYS = [
    'equip_pool',
    'socialize_pool',
    'skill_pool',
    'base_pool',
    'addition_pool',
    'addition',
    'buff_pool',
    'reputation_pool',
    'task_pool',
    'role_attr',
    'role_buff',
    'pet_pool',
    'role_integral',
    'treasure_pool',
    'jackpot',
    'qingyuan',
    'title_list',
    'upper_limit',
];
const integral_key = ['world', 'gang', 'intersect', 'exploit', 'shenZhuang'];

module.exports = {
    /**
     * 添加角色信息
     * @param {*} data
     */
    asyncInsertRole: async function (data) {
        const keys = [];
        const values = [];
        const list = [];
        Object.keys(data).forEach((key) => {
            keys.push(key);
            values.push('?');
            list.push(ROLE_JSON_KEYS.includes(key) ? JSON.stringify(data[key]) : data[key]);
        })
        const sqlStr = `insert into role(${keys.join(',')}) values(${values.join(',')})`;
        const { results } = await asyncAdd(sqlStr, list);
        return results;
    },
    /**
     * 获取角色列表
     * @param {*} req 账号
     */
    asyncGetRoleList: async function (req) {
        const user = req.cookies["q_uid"];
        const region = req.cookies["region"];
        const { results } = await asyncQuery(`select * from role  where user_id="${user}" and region="${region}"`);
        return results;
    },
    /**
     * 获取角色信息
     * @param {*} role_id 角色id
     */
    asyncGetRoleInfo: async function (role_id) {
        const { results } = await asyncQuery(`select * from role  where role_id="${role_id}"`);
        const role = results[0];
        if (role) {
            Object.keys(role).forEach((key) => {
                if (ROLE_JSON_KEYS.includes(key)) {
                    role[key] = JSON.parse(role[key]);
                }
            })
            // 声望处理
            integral_key.forEach((key) => {
                if (!role['role_integral'][key]) {
                    role['role_integral'][key] = 0;
                }
            })
        }
        return role;
    },
    /**
     * 获取角色名称是否存在
     * @param {*} role_name 角色名称
     */
    asyncGetRoleName: async function (req, res, role_name) {
        const region = req.cookies["region"];
        const { results } = await asyncQuery(`select * from role  where role_name="${role_name}" and region="${region}"`);
        return results[0];
    },
    /**
     * 更新角色信息
     * @param {*} role_id 角色id
     * @param {*} data
     */
    asyncUpdateRole: async function (role_id, data) {
        const upData = [];
        Object.keys(data).forEach(key => {
            const value = ROLE_JSON_KEYS.includes(key) ? JSON.stringify(data[key]) : data[key];
            upData.push(`${key}='${value}'`);
        })
        const { results } = await asyncQuery(`update role  SET ${upData.join(',')}  where role_id="${role_id}"`);
        return results[0];
    },
}
