const { FightG } = require('../../global');
module.exports = {
    /**
     * 计算buff回合
     * @param {*} req 
     * @param {*} res 
     */
    computeBuffs: function (req, res) {
        const { fightMap, fightInfo } = FightG.getFightGlobal(req, res);
        let { players, buffs } = fightInfo;
        let { player } = fightMap;
        // 不存在buff
        if (JSON.stringify(buffs) === '{}') {
            return;
        }

        Object.keys(buffs).forEach((key) => {
            const { values, t, text } = buffs[key];
            if (t === 1) {
                delete buffs[key];
                Object.keys(values).forEach((key) => {
                    player.attr[key] -= values[key];
                    players = players.map((itme) => {
                        itme.attr[key] -= values[key];
                        return itme;
                    })
                })
            } else {
                buffs[key] = {
                    values,
                    t: t - 1,
                    text
                }
            }
        })

        // 更新战斗池信息
        FightG.updataFightInfoGlobal(req, res, { players, buffs });
        FightG.updataFightMapGlobal(req, res, { player });
    },

};
