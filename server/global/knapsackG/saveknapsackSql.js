const { KNAPSACK_Global, EQUIP_INIT_EXT } = require('./config');
const { getRoleGlobal } = require('../roleG/getRoleGlobal');
const { isEquip } = require('@/table/knapsack/article');

function saveSqlChang(data) {
    const list = JSON.parse(JSON.stringify(data));
    return JSON.stringify(list.map((itme) => {
        delete itme.name;
        delete itme.uid;
        if (isEquip(itme.id)) {
            delete itme.s;
        }
        if (itme.ext === EQUIP_INIT_EXT) {
            delete itme.ext;
        }
        return itme
    }))
}
module.exports = {
    saveSqlChang,
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
            const value = key === 'data' ? saveSqlChang(knapsack[key]) : knapsack[key];
            data.push(`${key}='${value}'`)
        })
        if (data.length) {
            await res.asyncQuery(`update knapsack  SET ${data.join(',')}  where role_id="${role_id}"`);
        }
        return
    }
}
