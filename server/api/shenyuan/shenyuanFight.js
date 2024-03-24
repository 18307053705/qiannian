const { ShenYuanG, GrandG } = require('@/global');
function getBaseAttr() {
    return {
        life: 1000,
        atk_max: 180,
        atk_min: 150,
        dfs_max: 50,
        dfs_min: 30,
        hit: 20,
        sudden: 10,
        ice_atk_min: 25,
        ice_atk_max: 40,
        mine_atk_min: 25,
        mine_atk_max: 40,
        wind_atk_min: 25,
        wind_atk_max: 40,
        water_atk_min: 25,
        water_atk_max: 40,
        fire_atk_min: 25,
        fire_atk_max: 40,
        ice_dfs_min: 25,
        ice_dfs_max: 40,
        mine_dfs_min: 25,
        mine_dfs_max: 40,
        wind_dfs_min: 25,
        wind_dfs_max: 40,
        water_dfs_min: 25,
        water_dfs_max: 40,
        fire_dfs_min: 25,
        fire_dfs_max: 40,
    }
}
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
            type: 0,
            num: 1,
            grade: 2,
            career: 1,
            // 层数
            level: l * 5 + 50,
            // 每2层加1倍属性
            attr: parseInt(l / 2) + 5,
            // 帮人杀怪仅有经验奖励
            exp: roleId ? parseInt(exps / 2) : exps,
            tael: roleId ? parseInt(taels / 2) : taels,
            // 对方id
            role_id: roleId,
            path: '/shenYuan',
            customFreak: true,
            customCallback: 'shenYuan',
            baseAttr: getBaseAttr()
        }
        GrandG.setCurrentDir(req, res, currentDir);
        res.send({
            code: 0,
            path: '/fight'
        })
    }
}