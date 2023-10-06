const { RoleG, ActivityG } = require("../../global");
const { roleFn, fightFn } = require("../../utils");
module.exports = {
    /**
     * 攻击BOSS
     */
    atkBoss: function (req, res) {
        const { boss } = ActivityG.getWorldBoss(req, res);
        if (boss.life <= 0) {
            res.send({
                code: 0,
                message: '世界boss已死亡！'
            })
            return;
        }
        const roleInfo = RoleG.getRoleGlobal(req, res);
        if (roleInfo.life <= 0) {
            res.send({
                code: 0,
                message: '血量为空,无法攻击世界BOSS！'
            })
            return;
        }

        const { attr } = roleFn.computeRoleAttr(req, res, roleInfo)
        const roleAttr = fightFn.randomAttr(attr);
        const bossAttr = fightFn.randomAttr(boss);
        const dps = fightFn.computeFightDps(roleAttr, bossAttr);
        // 造成伤害
        if (dps) {
            boss.life -= dps;
            ActivityG.updateWorldBoss(req, res, { dps, boss });

        }
        res.send({
            code: 0,
            data: {
                dps,
                info: ActivityG.getWorldBoss()
            }
        })
    }
};