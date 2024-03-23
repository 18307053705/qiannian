const data = require('./data');
const enums = require('./enum');
const effect = require('./effect');

function getRoleBaseAttr(career) {
    let base;
    // 法皇,血煞,星君 攻击职业
    if ([1, 4, 7].includes(career)) {
        base = data.AttackBaseAttr;
    }
    // 战尊,战狂,战神 防御职业
    if ([2, 5, 8].includes(career)) {
        base = data.DefenseBaseAttr;
    }
    // 羽圣,赤魅,剑仙 敏捷职业
    if ([3, 6, 9].includes(career)) {
        base = data.AgileBaseAttr;
    }
    // 均衡职业
    if (!base) {
        base =  data.AverageRoleBaseAttr;
    }
    return JSON.parse(JSON.stringify(base));
}
module.exports = {
    ...effect,
    /**
     * 枚举信息
     */
    ...enums,
    /**
     * 获取角色基础属性
     * @param {*} career 
     */
    getRoleBaseAttr: getRoleBaseAttr,
    /**
     * 获取初始化属性
     * @param {Array} keys 
     */
    getInitAttr: function (keys) {
        if (!keys || !keys.length) {
            return JSON.parse(JSON.stringify(data.AllAttrMap));
        }
        if (!Array.isArray(keys)) {
            console.log('调用getInitAttr函数参数keys类型为Array');
            return;
        }
        const obj = {};
        keys.forEach((key) => {
            const num = data.AllAttrMap[key];
            if (num !== undefined) {
                obj[key] = num;
            } else {
                console.log('调用getInitAttr函数非法key：', key);
            }
        })
        return obj;
    },
    /**
     * 获取元素初始化属性
     * @param {Array} keys 
     */
    getInitEleAttr: function () {
        return JSON.parse(JSON.stringify(data.AllEleAttr));
    },
    /**
     * 获取宠物基础属性
     * @param {*} career 
     */
    getPetBaseAttr: function (career, ele) {
        const base = getRoleBaseAttr(career);
        const eleAttr = data.PetBaseEleAttr[ele] || {};
        return JSON.parse(JSON.stringify({
            ...base,
            ...eleAttr
        }))
    },
    /**
    * 获取怪物基础属性
    * @param {*} career 
    */
    getFreakBaseAttr: function (career, ele) {
        const base = getRoleBaseAttr(career);
        const eleAttr = data.PetBaseEleAttr[ele] || {};
        return JSON.parse(JSON.stringify({
            ...base,
            ...eleAttr
        }))
    },
}

