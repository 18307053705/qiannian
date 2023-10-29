const { knapsackTable } = require('../../table');

// const materialMap = {
//     // 一阶武器晶石,一阶头盔晶石,一阶铠甲晶石,一阶腰带晶石,一阶鞋子晶石,一阶戒指晶石,一阶项链晶石 35
//     1: [118, 122, 126, 130, 134, 138, 142],
//     // 二阶武器晶石,二阶头盔晶石,二阶铠甲晶石,二阶腰带晶石,二阶鞋子晶石,二阶戒指晶石,二阶项链晶石 55
//     2: [119, 123, 127, 131, 135, 139, 143],
//     // 三阶武器晶石,三阶头盔晶石,三阶铠甲晶石,三阶腰带晶石,三阶鞋子晶石,三阶戒指晶石,三阶项链晶石 70
//     3: [120, 124, 128, 132, 136, 140, 144],
//     // 顶阶武器晶石,顶阶头盔晶石,顶阶铠甲晶石,顶阶腰带晶石,顶阶鞋子晶石,顶阶戒指晶石,顶阶项链晶石 80
//     4: [121, 125, 129, 133, 137, 141, 145],
//     // 法则之石 90
//     5: [309],
//     // 大道之力 99
//     6: [310],
// }
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
            const { id, n, type } = knapsackTable.getArticle(articleInfo[0]);
            materia['article'][id] = {
                n,
                id,
                s: Number(articleInfo[1]),
                p: type
            }
        }
        return materia;


        // 根据装备等级判断锻造所需材料等级及数量,默认1级35-54,12
        // let materiaLevel = 1;
        // let materiaNum = 12;
        // let makeNum = 300;
        // // 姻缘石
        // let marriage = 0
        // if (level >= 55 && level < 70) {
        //     materiaLevel = 2;
        //     materiaNum = 24;
        //     makeNum = 600;
        //     marriage = 100;
        // }
        // if (level >= 70 && level < 80) {
        //     materiaLevel = 3;
        //     materiaNum = 36;
        //     makeNum = 1200;
        //     marriage = 200;
        // }
        // if (level >= 80 && level < 90) {
        //     materiaLevel = 4;
        //     materiaNum = 48;
        //     makeNum = 2400;
        // }
        // if (level >= 90 && level < 99) {
        //     materiaLevel = 5;
        //     materiaNum = 60;
        //     makeNum = 4800;
        //     marriage = 500;
        // }
        // if (level >= 99) {
        //     materiaLevel = 6;
        //     materiaNum = 72;
        //     makeNum = 9600;
        // }
        // // 计算材料信息
        // let materiaInfo = undefined;
        // // 非法宝
        // if (pos < 8) {
        //     // 141
        //     const materaIds = materialMap[materiaLevel];
        //     // 四阶及以下的材料皆有对应晶石
        //     const materiaId = materiaLevel < 5 ? materaIds[pos - 1] : materaIds[0];
        //     const { id, n, type } = knapsackTable.getArticle(materiaId);
        //     materiaInfo = {
        //         [id]: {
        //             n,
        //             id,
        //             s: materiaNum,
        //             p: type
        //         }
        //     }
        // } else {
        //     // 法宝所需声望翻倍
        //     makeNum = [184, 185].includes(equip.id) ? makeNum * 2 : makeNum * 3;
        // }
        // // 情缘装备,需要额外姻缘石
        // if (equip.id >= 141 && equip.id <= 155) {
        //     const { id, n, type } = knapsackTable.getArticle(311);
        //     materiaInfo[311] = {
        //         id,
        //         n,
        //         s: marriage,
        //         p: type
        //     }
        // }
        // return {
        //     materiaInfo,
        //     makeNum,
        //     make,
        //     equip
        // }
    }
};
