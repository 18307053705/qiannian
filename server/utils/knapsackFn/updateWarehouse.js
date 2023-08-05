
const { RoleG } = require("../../global");

function dataChang(data) {
    const list = JSON.parse(JSON.stringify(data));
    return JSON.stringify(list.map((itme) => {
        delete itme.n;
        return itme
    }));
}


module.exports = {
    /**
     * 更新仓库
     * @param {*} req 
     * @param {*} res
     * @param {*} data // 更新数据{data,yuanbao,teal}
     */
    updateWarehouse: async function (req, res, data) {
        const { role_id } = RoleG.getRoleGlobal(req, res);
        const upData = [];
        Object.keys(data).forEach(key => {
            const value = key === 'data' ? dataChang(data[key]) : data[key];
            upData.push(`${key}='${value}'`)
        })
        const { results } = await res.asyncQuery(`update warehouse  SET ${upData.join(',')}  where role_id="${role_id}"`);
        return results;
    },
}