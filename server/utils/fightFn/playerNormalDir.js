const { computeFightDps } = require('./computeFightDps');
const { FightG } = require('../../global');
module.exports = {
    /**
     * 玩家普通攻击
     * @param {*} req 
     * @param {*} res 
     * @param {*} playerAttr 玩家属性
     * @param {*} rivalAttr 对手属性
     * @param {*} fightRound 回合信息
     */
    playerNormalDir: function (req, res, playerAttr, rivalAttr, fightRound) {
        let { isHit, dps } = computeFightDps(req, res, playerAttr, rivalAttr);
        fightRound['dps'] = `-${dps}`;
        if (isHit && dps > 0) {
            const { fightInfo } = FightG.getFightGlobal(req, res);
            const { rivals } = fightInfo;
            let victory = true;
            let num = 1;
            const curRivals = rivals.map((rival) => {
                const { life } = rival.attr;
                if (life > 0) {
                    victory = false;
                    // 攻击次数大于0
                    if (num > 0) {
                        num--;
                        const curLife = life - dps > 0 ? life - dps : 0;
                        victory = curLife === 0
                        rival.attr.life = curLife;
                    }

                }
                return rival;
            })
            // 判断是否胜利
            if (victory) {
                FightG.updataFightMapGlobal(req, res, { state: 1 });
            }
            FightG.updataFightInfoGlobal(req, res, { rivals: curRivals });
        }
    },

};
