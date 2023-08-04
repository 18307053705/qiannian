const EquipTable = require("../table/equip");
module.exports = {

    // 卸下
    unloadEquip: function (pos_inx, equip, addition) {
        const { pos: posKey } = EquipTable.EQUIP_ATTR[pos_inx] || {};
        const { id, n, ext, name } = equip[posKey] || {};
        // 存在装备
        if (id) {
            const { attr } = EquipTable.computeAttr(EquipTable[id], ext);
            Object.keys(attr).forEach(key => {
                addition[key] -= attr[key];
            })
            delete equip[posKey];
            return { id, n: n || name, ext, p: 3 }
        }
    }
}