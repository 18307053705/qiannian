
const { AttributeTable } = require('../../table');
const { getGemAttr } = require('./getGemAttr')
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
};

// 佩戴法宝逻辑
// 法宝不可重复佩戴
function faBaofn(equip, equip_pool) {
    const { id, customAttr } = equip;
    // 判断是否已佩戴该类型法宝
    let posName = ['treasure1', 'treasure2', 'treasure3', 'treasure4'].find((posName => equip_pool[posName]?.id === id));
    if (posName) {
        return { pos: posName, attr: customAttr };
    }
    // 寻找未佩戴的部位
    posName = ['treasure1', 'treasure2', 'treasure3', 'treasure4'].find((posName => !equip_pool[posName]))
    // 如果法宝部位全部佩戴，则佩戴第一个法宝位置
    return posName ? { pos: posName, attr: customAttr } : { pos: 'treasure1', attr: customAttr }
}


module.exports = {
    /**
     * 计算装备的属性
     * @param {*} equip.id
     * @param {*} equip.name
     * @param {*} equip.type 物品类型,固定3(装备)
     * @param {*} equip.career 装备职业(0:全职,1:攻击,2:防御,3:敏捷)
     * @param {*} equip.level 装备等级
     * @param {*} equip.pos  部位:1(weapon:武器),2(helmet:衣服),3(clothing:头盔)4(belt:裤子)5(shoe:鞋子)6(ring:戒指)7(necklace:项链)
     * @param {*} equip.attr 属性加成
     * @param {*} equip.tips 描述
     * @param {*} equip.customAttr 法宝的属性
     * @param {*} equip.group 套装组
     * @param {*} objce.ext 可选参数,强化，锻造，附魔,宝石等,默认0_0_0_0_0_0_0_0
     * @param {*} objce.ext 可选参数,强化，锻造，附魔,宝石等,默认0_0_0_0_0_0_0_0
     * @returns {*} posName 装备部位对应key
     * @returns {*} attr 装备属性
     */
    computeEquipAttr: function (equip, equip_pool, ext = '0_0_0_0_0_0_0_0') {
        const { pos, career, attr, level, customAttr } = equip;
        // 解析强化，锻造，附魔,宝石
        const [firm, forge, sigil, ...gems] = ext.split('_');
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



        const equipAttr = AttributeTable.getInitAttr();
        const { pos: posName, attr: attrs } = pos < 8 ? EQUIP_ATTR[pos] : faBaofn(equip, equip_pool);
        const baseAttr = { ...AttributeTable.getRoleBaseAttr(career), ...AttributeTable.getRoleEleBaseAttr() };
        // 属性加成 = 装备自身加成 * 等级 * 强化锻造
        const addAttr = attr * level * Increase;
        // 计算宝石属性
        const gemAttr = getGemAttr(gems);
        Object.keys(equipAttr).forEach(key => {
            if (attrs.includes(key)) {
                equipAttr[key] += parseInt(baseAttr[key] * addAttr);
            }
            if (gemAttr[key]) {
                equipAttr[key] += gemAttr[key];
            }
        })
        // 附魔属性
        // 固定增加生命，法力,攻击,防御，
        if (sigil * 1) {
            equipAttr['life_max'] += sigil * 9000;
            equipAttr['mana_max'] += sigil * 9000;
            equipAttr['atk_max'] += sigil * 200;
            equipAttr['atk_min'] += sigil * 120;
            equipAttr['dfs_max'] += sigil * 100;
            equipAttr['dfs_min'] += sigil * 80;
        }

        Object.keys(equipAttr).forEach(key => {
            if (equipAttr[key] == 0) {
                delete equipAttr[key]
            }
        })

        return {
            attr: equipAttr,
            posName
        }
    }
}