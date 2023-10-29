const { KnapsackG, ErrorG, RoleG } = require('../../global');
const { knapsackTable } = require('../../table');
const { knapsackFn, equipFn } = require('../../utils');

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
        const { data, tael } = KnapsackG.getknapsackGlobal(req, res);
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

        const equipInfo = knapsackTable.getEquip(equip['id']);
        const { level, career } = equipInfo;
        const [_, forge] = equip['ext'].split('_');
        let materiaLevel = 1;
        let materiaNum = 1;
        let addTael = 100;
        if (level >= 50 && level < 70) {
            materiaLevel = 2;
            addTael *= 1000;
        }
        if (level >= 70 && level < 80) {
            materiaLevel = 3;
            addTael *= 5000;
        }
        if (level >= 80) {
            materiaLevel = 4;
            addTael *= 10000;
        }
        // 小于35的装备可以免费锻造,所有必须10次锻造之后才可分解出石头
        if (level < 35) {
            materiaNum = forge > 10 ? forge - 10 : 0;
            addTael *= level;
        } else {
            materiaNum = forge > 10 ? forge : 5;
        }
        let list = data;
        const success = [];
        if (materiaNum) {
            success.push(`${n}x${materiaNum}`);
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
            list = newData;
        }
        const { integral } = equipFn.getMakeInfo(equipInfo) || {};
        if (integral) {
            const { role_integral } = RoleG.getRoleGlobal(req, res);
            role_integral[integral.key] += integral.value;
            RoleG.updataRoleGlobal(req, res, { role_integral });
            success.push(`${integral.name}+${integral.value}`);
        }

        // 删除对应装备
        list.splice(in_x, 1);
        KnapsackG.updateknapsackGlobal(req, res, { data: list, tael: tael + addTael });
        success.push(`银两+${addTael}`);
        res.send({
            code: 0,
            success: `分解成功获得${success.join(',')}。`
        })
    }
};
