const { FightG } = require('../../global');
module.exports = {
    /**
     * 计算buff回合
     * @param {*} req 
     * @param {*} res 
     */
    computeBuffs: function (req, res) {
        const { fightMap } = FightG.getFightGlobal(req, res);
        
        const { player, buffs } = fightMap;
        // 不存在buff
        if (!buffs || JSON.stringify(buffs) === '{}') {
            return;
        }

        Object.keys(buffs).forEach((key) => {
            const { values, t, text } = buffs[key];
            if (t === 1) {
                delete buffs[key];
                player.attr[key] -= values[key];
            } else {
                buffs[key] = {
                    values,
                    t: t - 1,
                    text
                }
            }
        })
        // 更新战斗池信息
        FightG.updataFightMapGlobal(req, res, { player, buffs });
    },

};
