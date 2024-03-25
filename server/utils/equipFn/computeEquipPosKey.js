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
    computeEquipPosKey: function (equip, equip_pool) {
        const { pos: posName } = equip.pos < 8 ? EQUIP_ATTR[equip.pos] : faBaofn(equip, equip_pool);
        return posName;
    }
}