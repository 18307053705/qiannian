const { knapsackTable } = require('@/table');
// role_integral:{exploit:功勋,gang:帮会,world:世界,intersect:结义,shenZhuang:神装}
const TEXT_MEUN = {
    world: '世界功勋声望',
    gang: '帮会声望',
    exploit: '世界功勋',
}
module.exports = {
    /**
     * 打造装备的信息
     * @param {*} equip 装备信息
     * @returns materia.yuanbao 需要的元宝
     * @returns integral.key {exploit:功勋,gang:帮会,world:世界,intersect:结义,shenZhuang:神装}
     * @returns integral.value 所需声望
     * @returns integral.name 声望文案
     * @returns article 需要材料{id:{id,n,s,p}}
     */
    getMakeInfo: (equip) => {
        const { make } = equip;
        if (!make) {
            return undefined;
        }
        const { integral, yuanbao, article } = make;
        const [key, value] = integral.split('-');
        const materia = {
            integral: { key, name: TEXT_MEUN[key], value: Number(value) },
            yuanbao,
        }
        if (article) {
            materia['article'] = {};
            const articleInfo = article.split('-');
            const { id, name } = knapsackTable.getArticle(articleInfo[0]);
            materia['article'][id] = {
                name,
                id,
                s: Number(articleInfo[1]),
            }
        }
        return materia;
    }
};
