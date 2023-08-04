const drugList = require('./drugList');

module.exports = {
    /**
     * 获取物品
     * @param {*} drugId 物品id
     * @returns {*} drug || {}
     * @returns {*} drug.id
     * @returns {*} drug.n
     * @returns {*} drug.type 
     * @returns {*} drug.group1 || group2
     */
    getDrug: function (drugId) {
        const drug = drugList[drugId];
        return drug ? JSON.parse(JSON.stringify(drug)) : undefined
    }
}