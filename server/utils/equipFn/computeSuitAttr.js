const { AttributeTable } = require("../../table");
const { computeSuit } = require('./computeSuit');
module.exports = {
    /**
     * 获取套装信息
     * @param {*} equip_pool 当前装备池
     * @param {*} old_equip_pool 更新前装备池
     * @returns attrs 套装增加属性
     * @returns suit 套装文案信息
     */
    computeSuitAttr: function (equip_pool, old_equip_pool) {
        const suit = computeSuit(equip_pool);
        const suitOld = computeSuit(old_equip_pool);
        const addAttrs = AttributeTable.getInitAttr();
        const suitList = [];
       
        Object.keys(suit).forEach(group => {
            const { meet, attr, name } = suit[group];
            // 记录最新套装信息
            suitList.push({ n: name, id: group });
            const { meet: meet_old, attr: attr_old } = suitOld[group] || { attr: {}, meet: 0 };
            // 套装激活数量相同,属性不做变化
            if (meet === meet_old) {
                delete suitOld[group];
                return;
            }
            // 套装激活数量 大于 原来套装激活数量
            // 即套装属性增加,否则减少增加属性
            if (meet > meet_old) {
                // 减去旧套装属性，需判断旧套装属性是否满足激活 meet_old !== 0
                Object.keys(meet_old ? attr_old : {}).forEach((key) => {
                    addAttrs[key] -= attr_old[key];
                })
                // 增加新套装属性
                Object.keys(attr).forEach((key) => {
                    addAttrs[key] += attr[key];
                })
            } else {
                // 减去旧套装属性,此处旧套装必定激活状态,所以无需判断
                Object.keys(attr_old).forEach((key) => {
                    addAttrs[key] -= attr_old[key];
                })
                // 增加新套装属性,需判断新套装属性是否满足激活 meet_old !== 0
                Object.keys(meet ? attr : {}).forEach((key) => {
                    addAttrs[key] += attr[key];
                })
            }
            // 判断是否存在旧套装,是则删除，表示已操作过
            if (suitOld[group]) {
                delete suitOld[group];
            }
        })
        // 还存在旧套装信息,删除对应属性
        if (JSON.stringify(suitOld) !== '{}') {
            Object.values(suitOld).forEach(({ meet, attr }) => {
                // 满足激活数量,删除对应属性
                if (meet) {
                    Object.keys(attr).forEach((key) => {
                        addAttrs[key] -= attr[key];
                    })
                }
            })
        }
        Object.keys(addAttrs).forEach(key => {
            if (!addAttrs[key]) {
                delete addAttrs[key];
            }
        })
        return {
            attrs: addAttrs,
            suit: suitList
        }
    }
}