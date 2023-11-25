const { RoleG, KnapsackG, DailysG } = require("../../global");
const { knapsackTable } = require("../../table");
const { knapsackFn } = require('../../utils');

// 奖励池
// 灵血，银两必出
// 元宝 10%概率 
// 丹药，材料
// 25,26,27,28,42,43,44,45

function getList(level) {
    let list = [
        { id: 100 },
        { id: 101 },
        { id: 102 },
        { id: 103 }
    ];
    if (level >= 10) {
        list.push({ id: 104 }, { id: 105 });
    }
    if (level >= 30) {
        list = [
            { id: 104 },
            { id: 105 },
            { id: 106 },
            { id: 107 },
            { id: 110, min: 1, max: 3, r: 20 },
            { id: 111, min: 1, max: 3, r: 20 },
            { id: 112, min: 1, max: 3, r: 20 },
            { id: 113, min: 1, max: 3, r: 20 },
        ];
    }
    if (level >= 50) {
        list = [
            { id: 106 },
            { id: 107 },
            { id: 108 },
            { id: 109 },
            { id: 114, min: 1, max: 3, r: 20 },
            { id: 115, min: 1, max: 3, r: 20 },
            { id: 116, min: 1, max: 3, r: 20 },
            { id: 117, min: 1, max: 3, r: 20 },
        ];
    }
    if (level >= 70) {
        list = [
            { id: 108 },
            { id: 109 },
            { id: 1010 },
            { id: 1011 },
            { id: 118, min: 1, max: 3, r: 20 },
            { id: 119, min: 1, max: 3, r: 20 },
            { id: 1110, min: 1, max: 3, r: 20 },
            { id: 1111, min: 1, max: 3, r: 20 },
        ];
    }
    return list;
}

module.exports = {
    /**
     * 玩家首次登录抽奖
     */
    jackpotDay: async function (req, res) {
        const { day } = DailysG.getDailysGlobal(req, res)
        const { role_lx, role_level } = RoleG.getRoleGlobal(req, res);
        const { data, yuanbao, tael } = KnapsackG.getknapsackGlobal(req, res);
        if (day) {
            res.send({
                code: 0,
                message: '今日已经领取抽过奖了。'
            })
            return;
        }

        if (data.length >= KnapsackG.KNAPSACK_SIZE) {
            res.send({
                code: 0,
                message: '背包已满,请先清理物品。'
            })
            return;
        }
        // 灵血奖励，浮动10%-20%
        const lx_add = Math.floor(100000 * (Math.floor(Math.random() * 11) + 110) / 100);
        // 银两奖励，浮动20%-50%
        const tael_add = Math.floor(50000 * (Math.floor(Math.random() * 31) + 120) / 100);
        let yuanbao_add = 0;
        const textList = [
            {
                name: '灵血',
                value: lx_add,
            },
            {
                name: '银两',
                value: tael_add,
            }
        ]
        if ((Math.floor(Math.random() * 10) === 1)) {
            yuanbao_add = 50;
            textList.unshift({ name: '元宝', value: yuanbao_add })
        }
        // 全部50%几率
        const article = {};
        getList(role_level).forEach(({ id, min = 50, max = 100, r = 50 }) => {
            const rate = Math.floor(Math.random() * 100);
            if (rate < r) {
                const { name } = knapsackTable.getArticle(id);
                const s = Math.floor(Math.random() * (max - min)) + min;
                textList.push({
                    name,
                    value: s,
                })
                article[id] = {
                    id,
                    name,
                    s
                }
            }
        })

        const message = knapsackFn.addKnapsack(req, res, article, { data });
        if (message) {
            res.send({
                code: 0,
                message
            })
            return;
        }
        // 更新背包信息
        KnapsackG.updateknapsackGlobal(req, res, { yuanbao: yuanbao + yuanbao_add, tael: tael + tael_add });
        RoleG.updataRoleGlobal(req, res, { role_lx: lx_add + role_lx })
        // 更新首日登录领奖
        DailysG.updataDailysGlobal(req, res, { day: 1 })

        res.send({
            code: 0,
            data: textList
        })
    }
}
