const { KNAPSACK_Global } = require('./config');
const { getRoleGlobal } = require('../roleG/getRoleGlobal');

function dataChang(data) {
    const list = JSON.parse(JSON.stringify(data))
    return list.map((itme) => {
        delete itme.n;
        return itme
    });
}


module.exports = {
    /**
     * 保存背包信息至数据库
     * @param {*} req 
     * @param {*} res 
     * @param {*} role_id 角色Id,可选
     */
    saveknapsackSql: async function (req, res, roleId) {
        const { role_id } = getRoleGlobal(req, res);
        const { updateKeys, ...knapsack } = KNAPSACK_Global[roleId || role_id];
        const data = [];
        [...new Set(updateKeys)].forEach((key) => {
            const value = key === 'data' ? dataChang(knapsack[key]) : knapsack[key];
            data.push(`${key}='${value}'`)
        })
        if (data.length) {
            await res.asyncQuery(`update knapsack  SET ${data.join(',')}  where role_id="${role_id}"`);
        }
        return
    }
}
