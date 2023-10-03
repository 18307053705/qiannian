const { AttributeTable } = require("../../../table");
const { GrandG } = require("../../../global");
// // 怪物模型
// const freakTemplate = {
//     id: 1,
//     name: "怪物名称",
//     level: 1, // 等级
//     tag: 1, // 默认1,怪物标签(1:普通地图怪,2:副本任务怪)
//     type: 1, // 默认1，属性类型(1:攻击,2:防御,3:敏捷)
//     attr: 1, // 默认0.5，属性增幅
//     grade: 1, // 默认1，怪物品阶(1:普通,2:精英,3:boss)
//     num: -1, // 默认无限，可击杀次数
//     pet: true, // 默认不可捕获
//     rank: true, // 默认不可组队
//     exp: 10000, // 默认随等级，经验
//     tael: 10000, // 默认随等级，银两
//     article: '1-20,2-20,3', // 默认无，掉落物品信息(id-s-rate)多个物品使用,分隔 id：物品ID,s:数量,rate:概率
//     equip: '1-50,2-50,3-50,4-50,5-50', // 默认无，掉落装备信息(id-s-rate)多个物品使用,分隔 id：装备ID,rate:概率
// }
module.exports = {
    /**
     * 创建怪物
     * @param req 
     * @param res 
     * @returns rival 对手信息
     */
    creatFreak: function (req, res) {
        // 怪物模版
        const { currentDir: freakTemplate } = GrandG.getDirGlobal(req, res);
        const { name, level, type, attr, grade, id, num: num_max } = freakTemplate;
        // 生成怪物数量 1-4
        let num = Math.floor(Math.random() * 4) + 1;
        const attrs = AttributeTable.getFreakBaseAttr(type);
        const addition = level * attr;
        Object.keys(attrs).forEach((key) => {
            attrs[key] *= addition;
        })

        // 精英 
        if (grade === 2) {
            attrs['life'] *= 10;
            attrs['mana'] *= 10;
            num = 1;
        }

        // boss
        if (grade === 3) {
            attrs['life'] *= 100;
            attrs['mana'] *= 100;
            num = 1;
        }
        // 最大击杀数量，用于任务生成的怪，限制玩家刷怪
        if (num_max !== -1) {
            // 生成怪物不可超过最大数量
            if (currentDir.num < num) {
                num =  currentDir.num;
                currentDir.num = 0;
            }else{
                currentDir.num -= num;
            }

            GrandG.setDirGlobal(req, res, { currentDir });

        }
        attrs['life_max'] = attrs['life'];
        attrs['mana_max'] = attrs['mana'];
        const rivals = [];
        for (num; 0 < num; num--) {
            rivals.push({
                attr: attrs,
                name
            })
        }
        return {
            rivals,
            template: {
                id,
                num: rivals.length,
                name
            }
        };
    },

};
