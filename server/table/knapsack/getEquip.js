const equipList = require('./equipList');

module.exports = {
    /**
     * 获取装备信息
     * @param {*} equipId 装备id
     * @returns {*} equip || undefined
     * @returns {*} equip.id
     * @returns {*} equip.name
     * @returns {*} equip.type 物品类型,固定3(装备)
     * @returns {*} equip.career 装备职业(0:全职,1:攻击,2:防御,3:敏捷)
     * @returns {*} equip.level 装备等级
     * @returns {*} equip.pos  部位:1(weapon:武器),2(helmet:衣服),3(clothing:头盔)4(belt:裤子)5(shoe:鞋子)7(ring:戒指)8(necklace:项链)
     * @returns {*} equip.attr 属性加成
     * @returns {*} equip.tips 描述
     * @returns {*} equip.make {article:id-s,integral:key-value,yuanbao:2000}
     * @returns {*} equip.customAttr 法宝的属性
     * @returns {*} equip.group 套装组
     */
    getEquip: function (equipId) {
        const equip = equipList[equipId];
        return equip ? JSON.parse(JSON.stringify(equip)) : undefined
    }
}