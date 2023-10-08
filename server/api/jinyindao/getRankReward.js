const { ActivityG, RoleG, KnapsackG, ChatG } = require("../../global");
const { knapsackFn } = require('../../utils');
const { knapsackTable } = require('../../table');

module.exports = {
    /**
     * 获取排名奖励
     * @param {*} req.id_x
     */
    getRankReward: function (req, res) {
        const { role_id, role_name, socialize_pool } = RoleG.getRoleGlobal(req, res);
        const { ids } = ActivityG.getJinYinDao(req, res);
        const num = ids[role_id];
        if (num === undefined) {
            res.send({
                code: 0,
                message: '你所在帮会排名未进前三,无法进入金银岛挖宝'
            })
            return;
        }
        if (!num) {
            res.send({
                code: 0,
                message: '挖宝次数不足'
            })
            return;
        }
        const { level } = socialize_pool.gang;
        // 银两奖励，浮动20%-50%
        const tael_add = Math.floor(level * 10000 * (Math.floor(Math.random() * 31) + 120) / 100);
        let yuanbao_add = 50;
        const textList = [
            {
                name: '银两',
                value: tael_add,
            }
        ]
        if ((Math.floor(Math.random() * 2) === 1)) {
            yuanbao_add = 100;
            let rate = Math.floor(Math.random() * 101);
            // 1000元宝  百分之1
            if (rate === 100) {
                yuanbao_add = 1000;
                ChatG.sendChat(req, res, 0, `恭喜玩家：${role_name}在金银岛挖宝，竟然获得1000元宝。`);
            }
            // 200元宝  百分之10
            if (rate < 100 && rate >= 90) {
                yuanbao_add = 200;
            }

        }
        textList.unshift({ name: '元宝', value: yuanbao_add })
        // 超级体力丹,超级法力丹,超级攻击丹,超级防御丹,世界声望卷,帮会声望卷,结义声望卷,世界功勋卷
        // 全部50%几率
        const artReward = {};
        [25, 26, 27, 28, 36, 39, 42, 43, 44, 45].forEach((id) => {
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
        const { yuanbao, tael, data } = KnapsackG.getknapsackGlobal(req, res);
        const message = knapsackFn.addKnapsack(req, res, { article: { artReward }, data });
        if (message) {
            res.send({
                code: 0,
                message
            })
            return;
        }
        // 更新背包信息
        KnapsackG.updateknapsackGlobal(req, res, { yuanbao: yuanbao + yuanbao_add, tael: tael + tael_add });
        ids[role_id] -= 1;

        ActivityG.updateJinYinDao(req, res, { ids });

        res.send({
            code: 0,
            data: {
                textList,
                ids
            }
        })
    }
};