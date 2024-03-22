const { knapsackTable } = require("@/table");
module.exports = {
    /**
     * 获取套装信息
     * @param {*} equip_pool 
     * @returns suitMap { group:{name,attr,meet:达标件数 0 未达标} }
     */
    computeSuit: function (equip_pool) {
        // 套装id 对象
        const suitIdMap = {};
        const { suit, ...equip } = equip_pool;
        Object.values(equip).forEach(({ id }) => {
            const { group } = knapsackTable.getArticle(id);
            if (group) {
                suitIdMap[group] = suitIdMap[group] ? suitIdMap[group] + 1 : 1;
            }
        })
        // 套装信息列表
        Object.keys(suitIdMap).forEach(key => {
            const suitInfo = knapsackTable.getSuit(key);
            suitIdMap[key] = suitInfo.fn(suitInfo, suitIdMap[key]);
        });
        return suitIdMap;
    }
}