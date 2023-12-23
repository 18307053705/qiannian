module.exports = {
    /**
     * 送财童子-投资
     */
    invest: function (req, res) {
        const { role_level, jackpot } = RoleG.getRoleGlobal(req, res);
        const { yuanbao } = KnapsackG.getknapsackGlobal(req, res);
        if (role_level >= 30) {
            res.send({
                code: 0,
                message: '你等级过高，无法投资！'
            })
            return;
        }
        if (yuanbao < 200) {
            res.send({
                code: 0,
                message: '元宝不足200,投资失败！'
            })
            return;
        }
        if (jackpot.invest) {
            res.send({
                code: 0,
                message: '你已经投资过了！'
            })
            return;
        }
        jackpot.invest = 1;
        RoleG.updataRoleGlobal(req, res, { jackpot });
        KnapsackG.updateknapsackGlobal(req, res, { yuanbao: yuanbao - 200 });
        res.send({
            code: 0,
            success:'消耗200元宝,投资成功！'
        })

    }
}
