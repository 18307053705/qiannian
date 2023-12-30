const { FightG } = require('../../../global');
module.exports = {
    /**
     * 获取战斗结果
     * @param req 
     * @param res
     */
    getFightFormat: function (req, res) {
        const { FIGHT_TYPE_EUNM } = FightG;
        const { fightMap, fightInfo = {} } = FightG.getFightGlobal(req, res);
        const { id, type, state } = fightMap;
        if (type === FIGHT_TYPE_EUNM.pve || type === FIGHT_TYPE_EUNM.rank) {
            return {
                ...fightMap,
                players: fightInfo.players,
                buffs: type === FIGHT_TYPE_EUNM.rank ? fightInfo.buffs : fightMap.buffs,
                rivals: fightInfo.rivals,
            }
        }
        if (type === FIGHT_TYPE_EUNM.duel || type === FIGHT_TYPE_EUNM.kill) {
            // 判断对方是否释放战斗
            const tFightMap = FightG.getFightMap(id);
            if (tFightMap) {
                const { player } = tFightMap;
                return {
                    ...fightMap,
                    players: [player],
                    rivals: [{
                        attr: player.attr,
                        name: player.name
                    }]
                }
            }
            return {
                ...fightMap,
                state: state || 1
            }

        }
    },

};
