const { FightG } = require('../../global');
const { computeFightDps } = require('./computeFightDps');

module.exports = {
    /**
     * 敌人出招-仅人机对战
     * @param req
     * @param res
     */
    rivalAttack: function (req, res) {
        const { fightMap } = FightG.getFightGlobal(req, res);
        const { roundAttr, roundText, type } = fightMap;
        if (type !== 1 && type !== 2) {
            return;
        }

        const { role, rival } = roundAttr;
        const dps = computeFightDps(rival.attr, role.attr);
        if (dps) {
            role.life = role.life - dps > 0 ? role.life - dps : 0;
        }
        // 记录怪物伤害
        roundText.drain_life = `[-${dps}]`;
        FightG.updataFightMapGlobal(req, res, { roundAttr, roundText });

    },

};
