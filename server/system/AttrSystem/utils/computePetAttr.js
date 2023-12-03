const library = require('../0library');
const { getPetRating } = require('./getPetRating');

module.exports = {
    /**
     * 计算宠物属性
     * @param {*} param.type 类型(1:攻击,2:防御,3:敏捷)
     * @param {*} param.flair_x 先天资质
     * @param {*} param.flair 后天资质，可选默认0
     * @param {*} param.level 等级可选默认1
     * @param {*} param.ele 元素类型(1:冰,2:雷,3:风,4:水,5:火)可选默认0
     * @param {*} param.addition 额外属性可选默认{}
     * @param {*} attr  需要计算的属性,可选参数,默认为全部
     * @returns 
     */
    computePetAttr: function ({ type, flair_x, level = 1, addition = {}, ele = 0, flair = 0, }, attr = library.getInitAttr()) {
        const base = library.getPetBaseAttr(type, ele);
        const rating = getPetRating(flair_x);
        // 宠物属性=等级*对应属性*星级加成 * (先天资质 + 后天资质)
        const levelAttr = (flair_x + flair) * level * rating;
        Object.keys(initAttr).forEach((key) => {
            if (base[key]) {
                base[key] = Math.floor(base[key] * levelAttr);
            }
            attr[key] += addition[key];
        })
        return attr;
    }
}