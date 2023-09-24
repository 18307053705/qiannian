const { RoleG, KnapsackG } = require("../../global");
const { knapsackTable, PetTable } = require("../../table");
const { petFn, knapsackFn } = require('../../utils');
const moment = require('moment');



// 奖励池
// 灵血，银两必出
// 元宝 50%概率 
// 丹药，材料
// 25,26,27,28,42,43,44,45

module.exports = {
    /**
     * 玩家等级抽奖
     */
    jackpotLevel: async function (req, res) {
        const { jackpot, role_level, role_lx } = RoleG.getRoleGlobal(req, res);
        const { level = 0 } = jackpot;
        const jackLevel = level * 10 + 50;
        // 判断抽奖条件
        if (jackLevel > role_level) {
            res.send({
                code: 0,
                message: `抽奖失败,等级不足${jackLevel}，先去升级吧。`
            })
            return;
        }
        const { data, yuanbao, tael } = KnapsackG.getknapsackGlobal(req, res);
        if (data.length >= KnapsackG.KNAPSACK_SIZE) {
            res.send({
                code: 0,
                message: '背包已满,请先清理物品。'
            })
            return;
        }

        // 灵血奖励，浮动10%-20%
        const lx_add = Math.floor(jackLevel * 10000 * (Math.floor(Math.random() * 11) + 110) / 100);
        // 银两奖励，浮动20%-50%
        const tael_add = Math.floor(jackLevel * 10000 * (Math.floor(Math.random() * 31) + 120) / 100);
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
        if ((Math.floor(Math.random() * 2) === 1)) {
            let rate = Math.floor(Math.random() * 10001);
            // 10000元宝  万分之1
            if (rate === 10000) {
                yuanbao_add = role_level >= 80 ? 10000 : 5000;
            }
            // 5000元宝  千分之一
            if (rate < 10000 && rate >= 9990) {
                yuanbao_add = 5000;
            }
            // 2000元宝  百分之1
            if (rate < 9990 && rate >= 9890) {
                yuanbao_add = 2000;
            }
            if (!yuanbao_add) {
                yuanbao_add = (Math.floor(Math.random() * 10) + 1) * 100;
            }
            textList.unshift({ name: '元宝', value: yuanbao_add })
        }

        // 超级体力丹,超级法力丹,超级攻击丹,超级防御丹,世界声望卷,帮会声望卷,结义声望卷,世界功勋卷
        // 全部50%几率
        const artReward = {};
        [25, 26, 27, 28, 42, 43, 44, 45].forEach((id) => {
            if (Math.floor(Math.random() * 2) === 1) {
                const { n, type } = knapsackTable.getArticle(id);
                const s = Math.floor(Math.random() * 10) + 1;
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
        // 更新角色信息
        jackpot.level = level + 1;
        RoleG.updataRoleGlobal(req, res, {
            role_lx: lx_add + role_lx,
            jackpot
        })

        res.send({
            code: 0,
            data: {
                num: jackpot.level,
                textList
            }
        })
    }
}
