const { ShenYuanG, GrandG, RoleG } = require('../../global');
module.exports = {
    /**
     * @param roleId 传代表提对方闯深渊
     */
    shenyuanFight: function (req, res) {
        let { roleId } = req.body;
        const { role_id } = RoleG.getRoleGlobal(req, res);
        // 判断是否为自己的id
        roleId = role_id === roleId ? undefined : roleId;
        const shenyuan = ShenYuanG.getShenYuan(req, res, roleId);
        if (!shenyuan) {
            res.send({
                code: 0,
                message: '非法挑战深渊'
            })
            return;
        }
        const { l } = shenyuan;
        if (roleId) {
            const { s } = ShenYuanG.getShenYuan(req, res);
            if (s <= 0) {
                res.send({
                    code: 0,
                    message: '今日助人次数已用完'
                })
                return;
            }
            ShenYuanG.updateShenYuan(req, res, { s: s - 1 })
        }

        const exps = 1000000 * l;
        const taels = 100000 * l;
        const currentDir = {
            id: ShenYuanG.SHNEYUAN_FREAK_ID,
            name: "深渊BOSS",
            type: 2,
            num: 1,
            grade: 3,
            career: 1,
            level: l > 50 ? 100 : l + 50,
            // 每五层加1倍属性
            attr: parseInt(l / 5) + 5,
            // 帮人杀怪仅有经验奖励
            exp: roleId ? parseInt(exps / 2) : exps,
            tael: roleId ? parseInt(taels / 2) : taels,
            // 对方id
            role_id: roleId,
            path: '/shenYuan',
            shenyuan: true
        }
        GrandG.setCurrentDir(req, res, currentDir);
        res.send({
            code: 0,
            path: '/fight'
        })
    }
}