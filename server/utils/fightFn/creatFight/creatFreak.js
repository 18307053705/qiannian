const AttrSystem = require("@/system/AttrSystem");
const { GrandG } = require("@/global");
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
        const { name, level, career = 1, attr = 1, grade = 1, id, num: num_max, creatNum = 4, ele, baseAttr } = freakTemplate;
        // 生成怪物数量 1-4
        let num = Math.floor(Math.random() * creatNum) + 1;
        const attrs = AttrSystem.computeFreakAttr({ level, career, ele, attr, baseAttr })

        // 精英 
        if (grade === 2) {
            attrs['life'] *= 5;
            attrs['mana'] *= 5;
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
            if (freakTemplate.num < num) {
                num = freakTemplate.num;
                freakTemplate.num = 0;
            } else {
                freakTemplate.num -= num;
            }
            GrandG.setDirGlobal(req, res, { currentDir: freakTemplate });
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
                name,
                level
            }
        };
    },

};
