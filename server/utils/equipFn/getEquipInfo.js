
const { knapsackTable, AttributeTable } = require('@/table');
const { computeEquipAttr } = require('./computeEquipAttr');

module.exports = {
    /**
     * 获取装备描述
     * @param {*} equipId
     * @param {*} ext
     * @returns {*} attr 装备属性
     */
    getEquipInfo: function (equipId, ext) {
        const equip = knapsackTable.getArticle(equipId);
        const { attr } = computeEquipAttr(equip, ext);
        const MEUN = AttributeTable.getAttrMeun();
        const attrMap = {};
        Object.keys(attr).forEach((key) => {
            if (['life_max', 'mana_max'].includes(key)) {
                let str = key.replace('_min', '').replace('_max', '');
                attrMap[MEUN[str]] = attr[key]
                return;
            }
            if (['hit', 'dodge', 'sudden'].includes(key)) {
                attrMap[MEUN[key]] = attr[key];
                return;
            }
            let str = key.replace('_min', '').replace('_max', '');
            const min = `${str}_min`;
            const max = `${str}_max`;
            attrMap[MEUN[str]] = `${attr[min]}~${attr[max]}`;
        })

        return {
            ...equip,
            attr: attrMap
        }
    }
}