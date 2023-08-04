
const { AttributeTable } = require('../../table');

const EQUIP_ATTR = {
    1: {
        pos: 'weapon',
        attr: ['atk_min', 'atk_max']
    },
    2: {
        pos: 'helmet',
        attr: ['mana_max']
    },
    3: {
        pos: 'clothing',
        attr: ['life_max']
    },
    4: {
        pos: 'belt',
        attr: ['dfs_min', 'dfs_max']
    },
    5: {
        pos: 'shoe',
        attr: ['dodge']
    },
    6: {
        pos: 'ring',
        attr: ['hit']
    },
    7: {
        pos: 'necklace',
        attr: ['sudden']
    },
    // 8: {
    //     pos: 'treasure1',
    //     attr: ['atk_min', 'atk_max']
    // },
    // 9: {
    //     pos: 'treasure2',
    //     attr: ['atk_min', 'atk_max']
    // },
    // 10: {
    //     pos: 'treasure3',
    //     attr: ['atk_min', 'atk_max']
    // },
    // 11: {
    //     pos: 'treasure4',
    //     attr: ['atk_min', 'atk_max']
    // },
};
module.exports = {
    /**
     * 计算装备的属性
     * @param {*} equip.id
     * @param {*} equip.name
     * @param {*} equip.type 物品类型,固定3(装备)
     * @param {*} equip.career 装备职业(0:全职,1:攻击,2:防御,3:敏捷)
     * @param {*} equip.level 装备等级
     * @param {*} equip.pos  部位:1(weapon:武器),2(helmet:衣服),3(clothing:头盔)4(belt:裤子)5(shoe:鞋子)7(ring:戒指)8(necklace:项链)
     * @param {*} equip.attr 属性加成
     * @param {*} equip.tips 描述
     * @param {*} equip.customAttr 法宝的属性
     * @param {*} equip.group 套装组
     * @param {*} objce.ext 可选参数,强化，锻造，附魔,宝石等,默认0_0_0_0_0_0_0_0
     * @param {*} objce.ext 可选参数,强化，锻造，附魔,宝石等,默认0_0_0_0_0_0_0_0
     * @returns {*} posName 装备部位对应key
     * @returns {*} attr 装备属性
     */
    computeEquipAttr: function (equip, ext = '0_0_0_0_0_0_0_0') {
        const { pos, career, attr, level, customAttr } = equip;
        // 解析强化，锻造，附魔,宝石
        const [firm, forge, sigil, ...gem] = ext.split('_');
        // const forge = 50;
        // const firm = 16;
        let Increase = 1 + forge * 0.1;
        if (firm < 6) {
            Increase += firm * 0.1
        } else if (firm < 11) {
            Increase += 0.5 + (firm - 5) * 0.3
        }
        else if (firm < 15) {
            Increase += 2 + (firm - 10) * 0.5
        }
        else if (firm < 16) {
            Increase += 6
        } else {
            Increase += 9
        }
        const equipAttr = {};
        const equipInfo = pos < 8 ? EQUIP_ATTR[pos] : { pos: 'treasure1', attr: customAttr };
        const baseAttr = { ...AttributeTable.getRoleBaseAttr(career), ...AttributeTable.getRoleEleBaseAttr() };
        // 属性加成 = 装备自身加成 * 等级 * 强化锻造
        const addAttr = attr * level * Increase;
        equipInfo.attr.forEach((key) => {
            equipAttr[key] = parseInt(baseAttr[key] * addAttr);
        })
        return {
            attr: equipAttr,
            posName: equipInfo.pos,
        }
    }
}