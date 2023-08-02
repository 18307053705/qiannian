const { computeFightDps } = require('./computeFightDps');
const { FightG } = require('../../global');
module.exports = {
    /**
     * 普通攻击
     * @param {*} req 
     * @param {*} res 
     * @param {*} playerAttr 我的属性
     * @param {*} rivalAttr 怪物属性
     * @param {*} fightRound 回合信息
     */
    playerNormalDir: function (req, res, playerAttr, rivalAttr, fightRound, rise = 100, num = 1) {
        let { isHit, dps } = computeFightDps(req, res, playerAttr, rivalAttr, rise);
        fightRound['dps'] = num > 1 ? `-${dps}x${num}` : `-${dps}`;
        if (isHit && dps > 0) {
            const { fightInfo } = FightG.getFightGlobal(req, res);
            const { rivals } = fightInfo;
            const curRivals = rivals.map((rival) => {
                const { life } = rival.attr;
                if (life > 0) {
                    // 攻击次数大于0
                    if (num > 0) {
                        num--;
                        const curLife = life - dps > 0 ? life - dps : 0;
                        rival.attr.life = curLife;
                    }

                }
                return rival;
            })
            FightG.updataFightInfoGlobal(req, res, { rivals: curRivals });
            return curRivals;
        }
    },

};
