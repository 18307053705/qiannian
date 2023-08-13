const { knapsackTable } = require('../../table');
const materialIds = {
    ice: [213, 214, 215],
    mine: [210, 211, 212],
    wind: [207, 208, 209],
    water: [216, 217, 218],
    fire: [219, 220, 221],
}
const material = {};
Object.keys(materialIds).forEach(key => {
    materialIds[key].forEach((id) => {
        material[id] = {
            ...knapsackTable.getArticle(id),
            key
        };
    })
})
module.exports = {
    /**
     * 获取聚宝盆元素材料
     */
    getMaterialMeun: function () {
        return material;
    }
}