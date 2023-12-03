const library = require("../0library");
module.exports = {
    /**
     * 计算怪物属性
     * @param {*} config.level
     * @param {*} config.career
     * @param {*} config.ele
     * @param {*} config.attr
     * @returns {*} att
     * 
     */
    computeFreakAttr: function ({ level, attr, career, ele }) {
        const atts = library.getInitAttr();
        // 玩家属性 = 职业属性 * 等级 * 境界
        const base = library.getFreakBaseAttr(career, ele);
        const levelAttr = level * attr;
        // 基础属性与额外属性
        Object.keys(atts).forEach((key) => {
            if (base[key]) {
                base[key] *= levelAttr;
                atts[key] += base[key];
            }
        })
        return atts
    },
}
