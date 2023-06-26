const EquipTable = require("../table/equip");
module.exports = {
    // 佩戴
    wearEquip: function (pos_inx, knapsackEquip, level, equipOld, addition) {
        // 佩戴装备id
        const { id, n, ext } = knapsackEquip;
        const equip = EquipTable[id];
        if (equip.level > level) {
            return {
                message: `等级不足,无法该佩戴${n}`
            }
        }
        const updata = {
            replace: false
        };
        // 获取对应部位
        const { pos } = EquipTable.EQUIP_ATTR[pos_inx] || {};
        const { attr, posName } = EquipTable.computeAttr(equip, ext);
        const posKey = pos || posName;
        // 判断是否存在该部位的装备,替换
        if (equipOld[posKey]) {
            const old = equipOld[posKey];
            const { attr: oldAttr } = EquipTable.computeAttr(EquipTable[old.id], old.ext);
            Object.keys(oldAttr).forEach(key => {
                if (attr[key]) {
                    attr[key] -= oldAttr[key];
                } else {
                    attr[key] = oldAttr[key] * -1
                }
            })
            knapsackEquip['id'] = old['id'];
            knapsackEquip['n'] = old['n'];
            knapsackEquip['ext'] = old['ext'];
            // 替换信息
            replace['replace'] = true;
        }
        Object.keys(attr).forEach(key => {
            if (addition[key]) {
                addition[key] += attr[key];
            } else {
                addition[key] = attr[key];
            }
        })

        equipOld[posKey] = {
            id,
            name: n,
            ext
        }

        updata['attr'] = attr
        return updata;
    },
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