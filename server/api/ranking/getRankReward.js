const { TianBangG } = require('@/global');
module.exports = {
    /**
     * 获取排名信息
     * @param type 排名类型
     * @param page 页数 1:等级，2:境界，3:生命，4:法力，5:攻击，6:防御，7:命中，8:闪避，9:暴击,100:姻缘树,101：财富
     */
    getRankReward: async function (req, res) {
        const { type } = req.body;
        if (![1, 2, 3, 4, 5, 6, 7, 8, 9, 100, 101].includes(type)) {
            ErrorG.paramsError(res);
            return;
        }
        const { ranks, open } = TianBangG.getRank(type);
        if (!open) {
            res.send({
                code: 0,
                message: '不在天榜奖励领取时间。'
            })
            return;
        }

        const { role_id, qingyuan } = RoleG.getRoleGlobal(req, res);
        const id = type === 100 ? qingyuan?.d?.id : role_id;
        const index = ranks.findIndex(itme => itme.id === id);
        if (index === -1) {
            res.send({
                code: 0,
                message: '你未排入前十，无法领取奖励。',
                ranks
            })
            return;
        }
        const { ok } = ranks[index];
        // 情缘领取判断是否已领取 非情缘只需判断OK是否为true
        if ((type === 100 && ok.includes(role_id)) || (type !== 100 && ok)) {
            res.send({
                code: 0,
                message: '你已领取奖励，不可重复领取。'
            })
            return;
        }

        // 检验全部通过 领取奖励


        // 领取奖励成功 设置已领取
        TianBangG.setRank(type, index, role_id);
        res.send({
            code: 0,
            data: '领取成功',
            ranks
        })
    }
}