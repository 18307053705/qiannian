const { FightG } = require('../../../global');
const { attack } = require('./attack');
const { buff } = require('./buff');
const { getRoleArtInfo } = require('../../artFn/getRoleArtInfo');

module.exports = {
    /**
     * 法术出招
     * @param {*} req 
     * @param {*} res 
     * @param {*} artId 法术id
     */
    magicArts: function (req, res, artId) {
        const { p, d, v, t = 1 } = getRoleArtInfo(req, res, artId);
        const { fightMap } = FightG.getFightGlobal(req, res);
        const { roundAttr, roundText } = fightMap;
        // 非单攻,群攻,buff技能
        if (![1, 2, 3].includes(p)) {
            roundText.message = '法术异常';
            FightG.updataFightMapGlobal(req, res, { roundText });
            return;
        }

        const { role } = roundAttr;
        if (role.mana < d) {
            roundText.message = '法力不足！';
            FightG.updataFightMapGlobal(req, res, { roundText });
            attack(req, res, 100, 1);
            return;
        }

        // 法力消耗
        role.mana -= d;
        roundText.drain_mana = `[-${d}]`;
        FightG.updataFightMapGlobal(req, res, { roundAttr, roundText });

        // 伤害技能
        if (p === 1 || p === 2) {
            attack(req, res, v, t);
        }

        // buff技能
        if (p === 3) {
            buff(req, res, artId);
        }

    },

};
