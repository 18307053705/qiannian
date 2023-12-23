const { knapsackTable } = require('@/table');
const { ShopSql } = require("@/mysql");
function dataListChang(data) {
    try {
        return JSON.parse(data).map((itme) => {
            itme.name = itme.n || knapsackTable.getDataName(itme.id);
            if (knapsackTable.isEquip(itme.id)) {
                itme.s = 1;
                itme.ext = itme.ext || KnapsackG.EQUIP_INIT_EXT;
            }
            return itme;
        })
    } catch (error) {
        console.log('店铺JSON解析报错：', error);
        console.log('店铺JSON解析报错：', data);
        return [];
    }
}

module.exports = {
    /**
     * 获取店铺信息
     * @param {*} req 
     * @param {*} res 
     * @param {*} roleId 可选参数
     * @returns Promise<article,pet>
     */
    asyncGetShopInfo: async function (req, res, roleId) {
        const { role_id } = RoleG.getRoleGlobal(req, res);
        const results = await ShopSql.asyncIdToShop(roleId || role_id);
        if (results[0]) {
            return {
                ...results[0],
                article: dataListChang(results[0]['article']),
                petList: JSON.parse(results[0]['petList']),
            }
        }
        return undefined;
    }
}