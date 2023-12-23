const { ShopSql } = require("@/mysql");
const { knapsackTable } = require("@/table");

function saveSqlChange(data) {
    const list = JSON.parse(JSON.stringify(data));
    const date = new Date() * 1;
    return JSON.stringify(list.map((itme, index) => {
        delete itme.name;
        if (knapsackTable.isEquip(itme.id)) {
            delete itme.s;
        }
        if (itme.ext === knapsackTable.EQUIP_INIT_EXT) {
            delete itme.ext;
        }
        if (!itme.uid) {
            itme.uid = `${date}${index}`;
        }
        return itme
    }))
}

module.exports = {
    /**
     * 修改店铺信息
     * @param {*} req 
     * @param {*} res 
     * @param {*} data 更新数据
     * @param {*} roleId 可选参数
     * @returns Promise
     */
    asyncUpdataShopInfo: async function (req, res, data, roleId) {
        const { role_id } = RoleG.getRoleGlobal(req, res);
        const upData = [];
        Object.keys(data).forEach(key => {
            let value = data[key];
            if (key === 'article') {
                value = saveSqlChange(data[key]);
            }
            if (key === 'petList') {
                value = JSON.stringify(data[key]);
            }
            upData.push(`${key}='${value}'`);
        })
        const results = await ShopSql.asyncUpdateShop(upData.join(','), roleId || role_id);
        return results;
    },
}