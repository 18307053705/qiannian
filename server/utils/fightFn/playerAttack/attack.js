const { FightG } = require('../../../global');
const { computeFightDps } = require('../computeFightDps');

module.exports = {
    /**
     * 攻击
     * @param req 
     * @param res
     * @param rise 伤害倍数,默认100%,正常伤害
     * @param num 攻击数量,默认1
     */
    attack: function (req, res, rise = 100, num = 1) {
        const { fightInfo } = FightG.getFightGlobal(req, res);
        const { roundAttr, roundText } = fightInfo;
        const { role, rival } = roundAttr;
        // 计算伤害
        const dps = computeFightDps(role.attr, rival.attr, rise);
        if (dps) {
            roundAttr.rival.list = rival.list.map((attr) => {
                const { life } = attr;
                if (life > 0) {
                    // 攻击次数大于0
                    if (num > 0) {
                        num--;
                        const curLife = life - dps > 0 ? life - dps : 0;
                        attr.life = curLife;
                    }
                }
                return attr;
            })
        }
        // 记录伤害
        roundText.dps = num > 1 ? `[-${dps}x${num}]` : `[-${dps}]`;

        FightG.updataFightInfoGlobal(req, res, { roundAttr, roundText });
    },

};
