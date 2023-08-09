const { artComputeAttr } = require("./artComputeAttr");
module.exports = {
    /**
     * 技能升级
     * @param {*} old_art 升级前技能信息(l,r,id)
     * @param {*} up_art 升级后技能信息(l,r,id)
     * @param {*} additon 额外属性(被动升级计算)
     * @returns artInfo 升级后的技能信息(d,v,t,e)
     * @returns additon 额外属性(被动升级计算)
     */
    artUpLevel: function (old_art, up_art, addition) {
        const { artInfo, attr } = artComputeAttr(up_art);
        if (attr) {
            const { attr: deleteAttr } = artComputeAttr(old_art);
            Object.keys(attr).forEach(key => {
                addition[key] += attr[key] - deleteAttr[key];
            })
        }
        return {
            artInfo,
            addition
        }
    }
};
