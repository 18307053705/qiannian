const { FightG } = require('../../../global');
module.exports = {
    /**
     * 计算buff回合
     * @param {*} req 
     * @param {*} res 
     */
    computeBuffs: function (req, res) {
        const { FIGHT_TYPE } = FightG;
        const { fightMap, fightInfo } = FightG.getFightGlobal(req, res);
        const buffs = FIGHT_TYPE.rank === fightMap.type ? fightInfo.buffs : fightMap.buffs;
        // 不存在buff
        if (JSON.stringify(buffs) === '{}') {
            return;
        }
        const { player } = fightMap;
        const { role_id, attr } = player;
        Object.keys(buffs).forEach((key) => {
            const { values, t, text, role } = buffs[key];
            // 判断buff回合
            if (t === 0) {
                delete buffs[key];
                if (role.includes(role_id)) {
                    Object.keys(values).forEach((key) => {
                        attr[key] -= values[key];
                    })
                    player.attr = attr;
                }
                return;
            }
            // 判断是否加持过buff，未加持则进行加持
            if (!role.includes(role_id)) {
                Object.keys(values).forEach((key) => {
                    attr[key] += values[key];
                })
                player.attr = attr;
                role.push(role_id);
            }
            buffs[key] = {
                values,
                t: t - 1,
                text,
                role
            }
        })

        FightG.updataFightMapGlobal(req, res, { player });
        FIGHT_TYPE.rank === fightMap.type ? FightG.updataFightInfoGlobal(req, res, { buffs }) : FightG.updataFightMapGlobal(req, res, { buffs });

    },

};
