module.exports = {
    /**
     * 分配潜力
     * @param
     */
    distributionPotential: function (req, res) {
        const { ti_zhi = 0, geng_gu = 0, bi_li = 0, nai_li = 0, shen_fa = 0 } = req.body;
        const { role_attr } = RoleG.getRoleGlobal(req, res);
        const num = ti_zhi + geng_gu + bi_li + nai_li + shen_fa;
        if (num > role_attr.qian_li) {
            res.send({
                code: 0,
                message: '潜力值不足，分配失败。'
            })
            return;
        }
        role_attr.qian_li -= num;

        role_attr.potential.ti_zhi += ti_zhi;
        role_attr.potential.geng_gu += geng_gu;
        role_attr.potential.bi_li += bi_li;
        role_attr.potential.nai_li += nai_li;
        role_attr.potential.shen_fa += shen_fa;

        RoleG.updataRoleGlobal(req, res, { role_attr });

        res.send({
            code: 0,
            success: '潜力分配成功。'
        })
    }
}
