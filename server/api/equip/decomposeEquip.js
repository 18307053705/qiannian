const { KnapsackG, ErrorG } = require('../../global');
const { knapsackTable } = require('../../table');
const { knapsackFn } = require('../../utils');

const materialMap = {
    // 一阶玄石,一阶玉石,一阶云石 50
    1: [106, 110, 114],
    // 二阶玄石,二阶玉石,二阶云石 
    2: [107, 111, 115],
    // 三阶玄石,三阶玉石,三阶云石 50
    3: [108, 112, 116],
    // 顶阶玄石,顶阶玉石,顶阶云石 50
    4: [109, 113, 117]
}

module.exports = {
    /**
     * 装备分解
     * @param req.in_x 装备在背包内的下标
     */
    decomposeEquip: (req, res) => {
        const { in_x } = req.body;
        if (in_x === undefined) {
            ErrorG.paramsError(res);
            return;
        }
        const { data, } = KnapsackG.getknapsackGlobal(req, res);
        const equip = data[in_x] || {};
        if (equip['p'] !== 3) {
            res.send({
                code: 0,
                message: '物品信息有误'
            })
            return;
        }
        if (data.length >= KnapsackG.KNAPSACK_SIZE) {
            res.send({
                code: 0,
                message: '背包已满,请先清理背包'
            })
            return;
        }
        const { level, career } = knapsackTable.getEquip(equip['id']);
        const [_, forge] = equip['ext'].split('_');
        let materiaLevel = 1;
        let materiaNum = 1;
        if (level >= 50 && level < 70) {
            materiaLevel = 2;
        }
        if (level >= 70 && level < 80) {
            materiaLevel = 3;
        }
        if (level >= 80) {
            materiaLevel = 4;
        }
        // 小于35的装备可以免费锻造,所有必须10次锻造之后才可分解出石头
        if (level < 35) {
            materiaNum = forge > 10 ? forge - 10 : 0;
        } else {
            materiaNum = forge > 10 ? forge : 5;
        }

        if(!materiaNum){
            res.send({
                code: 0,
                success: `分解成功,获得银两x${materiaNum}`
            })
            return;
        }


        const materialIds = materialMap[materiaLevel];
        // 全职使用玄石
        const id = materialIds[career ? career - 1 : 0];
        const { n, type } = knapsackTable.getArticle(id);
        const artReward = {
            [id]: {
                id,
                n,
                s: materiaNum,
                p: type
            }
        }
        const { message, data: newData } = knapsackFn.addArticle({ artReward }, data);
        if (message) {
            res.send({
                code: 0,
                message
            })
            return;
        }
        newData.splice(in_x, 1)
        KnapsackG.updateknapsackGlobal(req, res, { data: newData });
        res.send({
            code: 0,
            success: `分解成功,获得${n}x${materiaNum}`
        })
    }
};
