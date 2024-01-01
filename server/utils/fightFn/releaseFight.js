const { FightG } = require("@/global");
const { FIGHT_TYPE_EUNM, FIGHT_STATE_EUNM } = FightG;
module.exports = {
    /**
     * 放弃战斗
     * @param {*} req 
     * @param {*} res
     */
    releaseFight: function (req, res) {
        const { fightInfo, fightRankInfo } = FightG.getFightGlobal(req, res) || {};
        if (!fightInfo) {
            return;
        }
        const { type, id, player } = fightInfo;
        // 玩家战斗
        if (type === FIGHT_TYPE_EUNM.duel || type === FIGHT_TYPE_EUNM.kill) {
            const { fightInfo: tFightInfo } = FightG.getFightGlobal(req, res, id) || {};
            // 对方状态更改为胜利
            if (tFightInfo?.state === FIGHT_STATE_EUNM.inCombat) {
                FightG.updataFightMapGlobal(req, res, { state: FIGHT_STATE_EUNM.victory }, id);
            }
        }
        // 组队战斗
        if (type === FIGHT_TYPE_EUNM.rank && fightInfo.state === FIGHT_STATE_EUNM.inCombat) {
            const { players } = fightRankInfo;
            if (players.length === 1) {
                FightG.deleteFightRankGlobal(id);
            } else {
                FightG.updataFightRankInfoGlobal(req, res, { players: players.filter(({ role_id }) => role_id !== roleInfo.role_id) })
            }
        }
        if (type !== FIGHT_TYPE_EUNM.duel) {
            // 更新角色属性
            RoleG.updataRoleGlobal(req, res, {
                life: player.attr.life,
                mana: player.attr.mana
            })
        }

        FightG.deleteFightGlobal(req, res);
    }
};
