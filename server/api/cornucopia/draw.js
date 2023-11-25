const { RoleG, KnapsackG, ChatG } = require('../../global');
const { cornuconpiaFn, knapsackFn } = require('../../utils');
module.exports = {
    /**
     * 聚宝盆等级抽奖
     */
    draw: function (req, res) {
        const { treasure_pool, role_level, role_name } = RoleG.getRoleGlobal(req, res);
        const { data } = KnapsackG.getknapsackGlobal(req, res);
        // 角色等级未达到50级，为非法操作
        if (role_level < 50) {
            return;
        }
        if (data.length >= KnapsackG.KNAPSACK_SIZE) {
            res.send({
                code: 0,
                message: '背包已满,请先清理背包'
            })
            return;
        }
        const { lx, l } = treasure_pool['jbp'];
        if (lx === l) {
            res.send({
                code: 0,
                data: {
                    msg: '有效抽奖次数为0'
                }
            })
            return;
        }
        const rate = Math.floor(Math.random() * (10000 - 0));
        let yuanbaoNum = 0;
        if (rate === 0) {
            yuanbaoNum = 5000;
            ChatG.sendChat(req, res, 0, `恭喜玩家：${role_name}在聚宝盆中获得5000元宝大奖，快去试一试运气吧。`);
        }
        if (rate < 3 && !yuanbaoNum) {
            yuanbaoNum = 2000;
            ChatG.sendChat(req, res, 0, `恭喜玩家：${role_name}在聚宝盆中获得2000元宝大奖，快去试一试运气吧。`);
        }
        if (rate < 50 && !yuanbaoNum) {
            yuanbaoNum = 200;
        }
        let msg = '';
        if (yuanbaoNum) {
            msg = `恭喜玩家获得${yuanbaoNum}元宝。`
            KnapsackG.updateknapsackGlobal(req, res, { yuanbao: yuanbao + yuanbaoNum });
        } else {
            const { id, name } = cornuconpiaFn.getPrize(treasure_pool['jbp']);
            msg = `恭喜玩家获得${name}。`;
            knapsackFn.addKnapsack(req, res, { [id]: { id, name, s: 1 } });
        }

        treasure_pool['jbp'].l = l + 1;
        RoleG.updataRoleGlobal(req, res, { treasure_pool });
        res.send({
            code: 0,
            data: {
                msg,
                l: l + 1
            }
        })
    }
}


