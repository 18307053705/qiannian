const { knapsackFn } = require('@/utils');
module.exports = {
    /**
     * 重置潜力
     * @param
     */
    resetPotential: function (req, res) {
        // 判断是否存在洗髓丹
        const { message } = knapsackFn.deleteKnapsack(req, res, { 1623: { s: 1 } });
        if (message) {
            res.send({
                code: 0,
                message: '洗髓丹数量不足，无法重置潜力。'
            })
            return;
        }
        const { role_attr } = RoleG.getRoleGlobal(req, res);
        role_attr.qian_li = max_qian_li;
        role_attr.potential = {
            ti_zhi: 0,
            geng_gu: 0,
            bi_li: 0,
            nai_li: 0,
            shen_fa: 0,
        };

        RoleG.updataRoleGlobal(req, res, { role_attr });

        res.send({
            code: 0,
            success: '潜力重置成功。'
        })
    }
}

