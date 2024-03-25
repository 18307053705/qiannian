const { ActivityG, ActiveQueueG } = require("@/global");
const { roleFn, fightFn } = require("@/utils");
const { AttrSystem } = require("@/system");
const { shedRandom } = require("./shedRandom.js");




module.exports = {
    /**
     * 攻击BOSS
     */
    atkBoss: function (req, res) {
        if (!ActiveQueueG.getWorldBoss()) {
            res.send({
                code: 0,
                message: '世界BOSS活动已结束'
            })
            return;
        }
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

        const { attr } = AttrSystem.computeRoleAttr(req, res, roleInfo);
        const roleAttr = fightFn.randomAttr(attr);
        const bossAttr = fightFn.randomAttr(boss);
        const dps = fightFn.computeFightDps(roleAttr, bossAttr);
        // 造成伤害
        if (dps) {
            let shed = [];
            boss.life -= dps;
            if (boss.life <= 0) {
                boss.life = 0;
                shed = shedRandom()
                // 掉落物品
                ActiveQueueG.closeWorldBoss();
            }
            ActivityG.updateWorldBoss(req, res, { dps, boss, shed });
        }
        const { boss: bossInfo, rank, shed } = ActivityG.getWorldBoss(req, res);
        res.send({
            code: 0,
            data: {
                dps,
                boss: bossInfo,
                rank,
                shed,
            }
        })
    }
};