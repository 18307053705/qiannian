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
    'can_task_pool'];
module.exports = {
    knapsackGlobal: {
        // key：角色id {...knapsack,updateKeys:[] }
        // updateKeys 记录更新key,判断角色退出后是否需要更新，避免无端操作数据库
    },
    // 设置角色全局背包信息
    setknapsackGlobal: function (req, knapsack) {
        const { role_id } = this.getRoleGlobal(req);
        this.knapsackGlobal[role_id] = {
            ...knapsack,
            data: JSON.parse(knapsack['data']),
            updateKeys: [],
            id: role_id
        };
    },
    // 获取角色全局背包信息
    getknapsackGlobal: function (req, roleId) {
        const { role_id } = this.getRoleGlobal(req);
        const knapsack = this.knapsackGlobal[roleId || role_id];
        if (knapsack) {
            return JSON.parse(JSON.stringify(knapsack));
        }
        return false;
    },
    // 更新角色全局背包信息
    updateknapsackGlobal: function (req, data, roleId) {
        const { role_id } = this.getRoleGlobal(req);
        let updateKeys = Object.keys(data);
        const knapsack = this.knapsackGlobal[roleId || role_id];
        if (knapsack) {
            this.knapsackGlobal[knapsack.role_id] = {
                ...knapsack,
                ...data,
                updateKeys: [...knapsack.updateKeys,...updateKeys]
            };
        }
        return knapsack;
    },
    // 角色释放，信息保存到数据库
    saveknapsack: async function (role_id) {
        const { updateKeys, ...knapsack } = this.knapsackGlobal[role_id];
        const data = [];
        [...new Set(updateKeys)].forEach((key) => {
            const value = key === 'data' ? JSON.stringify(knapsack[key]) : knapsack[key];
            data.push(`${key}='${value}'`)
        })
        if(data.length){
            await mysql.asyncQuery(`update knapsack  SET ${data.join(',')}  where role_id="${role_id}"`);
        }
        return 
    }
}
