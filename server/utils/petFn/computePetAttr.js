const { AttributeTable } = require('../../table');
const { ELE_MEUN } = require('./pet_meun');
const { getPetRating } = require('./getPetRating');

module.exports = {
    /**
     * 技术宠物属性
     * @param petInfo.type 类型(1:攻击,2:防御,3:敏捷)
     * @param petInfo.flair_x 先天资质
     * @param petInfo.flair 后天资质，可选默认0
     * @param petInfo.level 等级可选默认1
     * @param petInfo.ele 元素类型(1:冰,2:雷,3:风,4:水,5:火)可选默认0
     * @param petInfo.addition 额外属性可选默认{}
     * @param limit 需要计算的属性,可选默认全部
     * @returns Promise 
     */
    computePetAttr: function ({ type, flair_x, level = 1, addition = {}, ele = 0, flair = 0, }, limit) {
        let attr = AttributeTable.getPetBaseAttr(type);
        if (ELE_MEUN[ele]) {
            attr = {
                ...attr,
                ...ELE_MEUN[ele]
            }
        }
        const rating = getPetRating(flair_x);
        const initAttr = limit || AttributeTable.getInitAttr();

        // 宠物属性=等级*对应属性*星级加成 * (先天资质 + 后天资质)
        const flairAttr = (flair_x + flair) * level * rating;
        Object.keys(initAttr).forEach((key) => {
            if (attr[key]) {
                attr[key] =  Math.floor(attr[key] * flairAttr);
            }
            if (addition[key]) {
                attr[key] = attr[key] ? attr[key] + addition[key] : addition[key];
            }
        })
        return attr;
    }
}