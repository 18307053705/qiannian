const { FightG } = require('@/global');
const { FIGHT_TYPE_EUNM } = FightG;
module.exports = {
    /**
     * 返回响应客户端数据
     * @param req 
     * @param res
     */
    getFightFormat: function (req, res) {
        const { fightInfo, fightRankInfo } = FightG.getFightGlobal(req, res);
        const { id, type, player } = fightInfo;
        // 玩家 vs 人机
        if (type === FIGHT_TYPE_EUNM.pve) {
            return {
                ...fightInfo,
                players: [player],
            };
        }
        // 多玩家 vs 人机
        if (type === FIGHT_TYPE_EUNM.rank) {
            return {
                ...fightInfo,
                players: fightRankInfo?.players,
                buffs: fightRankInfo?.buffs,
                rivals: fightRankInfo?.rivals,
            };
        }
        // 玩家 vs 玩家
        const { fightInfo: tFightInfo } = FightG.getFightGlobal(req, res, id) || {};
        return {
            ...fightInfo,
            players: [player],
            rivals: [{
                attr: tFightInfo?.player.attr,
                name: tFightInfo?.player.name
            }]
        }
    },

};
