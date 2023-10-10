const { RoleG, ActivityG,ActiveQueueG } = require("../../global");
const { roleFn, fightFn } = require("../../utils");


// 掉落物品
function shedRandom() {
    const list = [
        {
            id: 9,
            n: '天山雪莲',
            s: 50,
            r: 50,
        },
        {
            id: 10,
            n: '天山真水',
            s: 50,
            r: 50,
        },
        {
            id: 11,
            n: '千年首乌',
            s: 20,
            r: 50,
        },
        {
            id: 12,
            n: '琼浆玉液',
            s: 20,
            r: 50,
        },
        {
            id: 25,
            n: '超级体力丹',
            s: 2,
            r: 30,
        },
        {
            id: 26,
            n: '超级法力丹',
            s: 2,
            r: 30,
        },
        {
            id: 27,
            n: '超级攻击丹',
            s: 2,
            r: 30,
        },
        {
            id: 28,
            n: '超级防御丹',
            s: 2,
            r: 30,
        },
        {
            id: 34,
            n: '灵血丸',
            s: 1,
            r: 20,
        },
        {
            id: 34,
            n: '灵血丸',
            s: 1,
            r: 20,
        },
        {
            id: 222,
            n: '经验丹',
            s: 1,
            r: 20,
        },
        {
            id: 222,
            n: '经验丹',
            s: 1,
            r: 10,
        },
        {
            id: 222,
            n: '经验丹',
            s: 1,
            r: 10,
        },
        {
            id: 222,
            n: '经验丹',
            s: 1,
            r: 10,
        },
        {
            id: 222,
            n: '经验丹',
            s: 1,
            r: 10,
        },
        {
            id: 37,
            n: '三倍经验卡',
            s: 1,
            r: 10,
        },
        {
            id: 38,
            n: '五倍经验卡',
            s: 1,
            r: 10,
        },
        {
            id: 38,
            n: '五倍经验卡',
            s: 1,
            r: 1,
        },
        {
            id: 40,
            n: '三倍经验卡',
            s: 1,
            r: 10,
        },
        {
            id: 41,
            n: '五倍经验卡',
            s: 1,
            r: 10,
        },
        {
            id: 42,
            n: '五倍经验卡',
            s: 1,
            r: 1,
        },
        {
            id: 47,
            n: '40元宝卡',
            s: 1,
            r: 50,
        },
        {
            id: 47,
            n: '40元宝卡',
            s: 1,
            r: 50,
        },
        {
            id: 47,
            n: '40元宝卡',
            s: 1,
            r: 50,
        },
        {
            id: 47,
            n: '40元宝卡',
            s: 1,
            r: 50,
        },
        {
            id: 47,
            n: '40元宝卡',
            s: 1,
            r: 50,
        },
        {
            id: 47,
            n: '40元宝卡',
            s: 3,
            r: 20,
        },
        {
            id: 47,
            n: '40元宝卡',
            s: 3,
            r: 20,
        },
        {
            id: 50,
            n: '200元宝卡',
            s: 1,
            r: 20,
        },
        {
            id: 50,
            n: '200元宝卡',
            s: 1,
            r: 20,
        },
        {
            id: 50,
            n: '200元宝卡',
            s: 3,
            r: 10,
        },
    ]

    const shed = [];
    list.forEach((itme, index) => {
        const rate = Math.floor(Math.random() * 100);
        if (itme.r > rate) {
            shed.push({
                ...itme,
                id_x: index
            })
        }
    })
    return shed;
}


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

        const { attr } = roleFn.computeRoleAttr(req, res, roleInfo)
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