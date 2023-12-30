const { FightG } = require('@/global');
const { computeFightDps } = require('./computeFightDps');
const { FIGHT_TYPE_EUNM } = FightG;
module.exports = {
    /**
     * 敌人出招-仅人机对战
     * @param req
     * @param res
     */
    rivalAttack: function (req, res) {
        const { fightInfo } = FightG.getFightGlobal(req, res);
        const { roundAttr, roundText, type } = fightInfo;

        if (type !== FIGHT_TYPE_EUNM.pve && type !== FIGHT_TYPE_EUNM.rank) {
            return;
        }

        const { role, rival } = roundAttr;
        const dps = computeFightDps(rival.attr, role.attr) * (rival.num > 3 ? 3 : rival.num);
        if (dps) {
            role.life = role.life - dps > 0 ? role.life - dps : 0;
        }
        // 记录怪物伤害
        roundText.drain_life = `[-${dps}]`;
        FightG.updataFightInfoGlobal(req, res, { roundAttr, roundText });

    },

};
