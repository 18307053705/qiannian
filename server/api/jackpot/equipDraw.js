const { RoleG, KnapsackG } = require("../../global");
const { knapsackTable, PetTable } = require("../../table");
const { petFn, knapsackFn } = require('../../utils');
const moment = require('moment');


// 装备奖励池
const equipPoolMap = {
    // 1级强化卡，1星魔符，40元宝卡
    1: [90, 147, 47],
    // 2级强化卡，2星魔符，60元宝卡
    2: [91, 148, 48],
    // 3级强化卡，3星魔符，100元宝卡
    3: [92, 149, 49],
    // 4级强化卡，4星魔符，200元宝卡
    4: [93, 150, 50],
    // 九歌，500元宝卡
    5: [180, 181, 51],
    // 才子佳人
    6: [156, 157, 158, 159, 160],
    // 君临天下
    7: [161, 162, 163, 164, 165],
    // 月华相思,上善若水
    8: [182, 183, 208, 209, 210, 211]
}

module.exports = {
    /**
     * 神装宝箱
     */
    equipDraw: async function (req, res) {
        const { jackpot } = RoleG.getRoleGlobal(req, res);
        let { data, yuanbao } = KnapsackG.getknapsackGlobal(req, res);
        if (data.length >= KnapsackG.KNAPSACK_SIZE) {
            res.send({
                code: 0,
                message: '背包已满,请先清理物品。'
            })
            return;
        }
        if (yuanbao < 200) {
            res.send({
                code: 0,
                message: '元宝不足200,无法继续砸宠！'
            })
            return;
        }
        // 0 - 100000;
        let rate = Math.floor(Math.random() * 100001);
        let rowid = 1;
        // 八级奖池:十万分之1
        if (rate === 100000) {
            rowid = 8;
        }
        // 七级奖池:十万分之10
        if (rate < 100000 && rate >= 99990) {
            rowid = 7;
        }
        // 六级奖池:十万分之20
        if (rate < 99990 && rate >= 99970) {
            rowid = 6;
        }
        // 五级奖池:十万分之30
        if (rate < 99970 && rate >= 99940) {
            rowid = 5;
        }
        // 四级奖池:十万分之100
        if (rate < 99840 && rate >= 99740) {
            rowid = 4;
        }
        // 三级奖池:十万分之1000
        if (rate < 99740 && rate >= 98740) {
            rowid = 3;
        }
        // 二级奖池:十万分之40000
        if (rate < 98740 && rate >= 58740) {
            rowid = 2;
        }
        let success = '';
        const equipPool = equipPoolMap[rowid];
        // 随机对应奖励池中的id
        const indxe = Math.floor(Math.random() * equipPool.length);
        const id = equipPool[indxe];
        const article = {};
        if ([5, 6, 7, 8].includes(rowid) && 51 !== id) {
            const { name, type } = knapsackTable.getEquip(id);
            success = `消耗200元宝,在神装活动中获得${name}`;
            article['equipReward'] = {
                [id]: {
                    p: type,
                    n: name,
                    s: 1,
                    id
                }
            }
        } else {
            const { type, n } = knapsackTable.getArticle(id);
            success = `消耗200元宝,在神装活动中获得${n}`;
            article['artReward'] = {
                [id]: {
                    p: type,
                    n,
                    s: 1,
                    id
                }
            }
        }
        knapsackFn.addKnapsack(req, res, { article });

        let isActivity = false;
        // 周六，周日开启活动
        if ([0, 6].includes(moment().days())) {
            isActivity = true;
            jackpot.equip += 1;
            if (jackpot.equip === 10) {
                jackpot.equip = 0;
                const yb = Math.floor(Math.random() * 1000) + 100;
                yuanbao += yb;
                success += `,天降鸿运恭喜额外获得${yb}元宝！！！`
            }
            RoleG.updataRoleGlobal(req, res, { jackpot });
        }
        // 更新背包信息
        KnapsackG.updateknapsackGlobal(req, res, { yuanbao: yuanbao - 200 });
        res.send({
            code: 0,
            data: {
                num: jackpot.equip,
                isActivity,
                day: moment().days()
            },
            success
        })
    }
}
