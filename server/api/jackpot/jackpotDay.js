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
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 }
    ];
    if (level >= 10) {
        list.push({ id: 5 }, { id: 6 });
    }
    if (level >= 30) {
        list = [
            { id: 5 },
            { id: 6 },
            { id: 7 },
            { id: 8 },
            { id: 13, min: 1, max: 5, r: 20 },
            { id: 14, min: 1, max: 5, r: 20 },
            { id: 15, min: 1, max: 5, r: 20 },
            { id: 16, min: 1, max: 5, r: 20 },
        ];
    }
    if (level >= 50) {
        list = [
            { id: 7 },
            { id: 8 },
            { id: 9 },
            { id: 10 },
            { id: 17, min: 1, max: 5, r: 20 },
            { id: 18, min: 1, max: 5, r: 20 },
            { id: 19, min: 1, max: 5, r: 20 },
            { id: 20, min: 1, max: 5, r: 20 },
        ];
    }
    if (level >= 70) {
        list = [
            { id: 9 },
            { id: 10 },
            { id: 11 },
            { id: 12 },
            { id: 21, min: 1, max: 5, r: 20 },
            { id: 22, min: 1, max: 5, r: 20 },
            { id: 23, min: 1, max: 5, r: 20 },
            { id: 24, min: 1, max: 5, r: 20 },
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
        const artReward = {};
        getList(role_level).forEach(({ id, min = 20, max = 100, r = 50 }) => {
            const rate = Math.floor(Math.random() * 100);
            if (rate < r) {
                const { n, type } = knapsackTable.getArticle(id);
                const s = Math.floor(Math.random() * (max - min)) + min;
                textList.push({
                    name: n,
                    value: s,
                })
                artReward[id] = {
                    id,
                    n,
                    p: type,
                    s
                }
            }
        })

        knapsackFn.addKnapsack(req, res, { article: { artReward }, data, force: true })
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
