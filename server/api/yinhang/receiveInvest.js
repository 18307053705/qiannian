const { KnapsackG } = require('@/global');

module.exports = {
    /**
     * 送财童子-领取投资
     */
    receiveInvest: function (req, res) {
        const { role_level, jackpot } = RoleG.getRoleGlobal(req, res);
        const { yuanbao } = KnapsackG.getknapsackGlobal(req, res);
        const { invest } = jackpot;
        if (!invest) {
            res.send({
                code: 0,
                message: '领取失败,你未投资！'
            })
            return;
        }

        if (invest === 5) {
            res.send({
                code: 0,
                message: '全部投资回报已领取！'
            })
            return;
        }
        // 领取投资等级
        const investLevel = invest * 10 + 40;
        if (investLevel > role_level) {
            res.send({
                code: 0,
                message: `等级不足${investLevel},领取失败！`
            })
            return;
        }
        jackpot.invest += 1;
        let rate = 3;
        if (invest === 2) {
            rate = 5;
        }
        if (invest === 3) {
            rate = 12;
        }
        if (invest === 6) {
            rate = 30;
        }

        RoleG.updataRoleGlobal(req, res, { jackpot });
        KnapsackG.updateknapsackGlobal(req, res, { yuanbao: yuanbao + (200 * rate) });
        res.send({
            code: 0,
            success: `领取${investLevel}级投资回报${200 * rate}元宝！`
        })

    }
}
