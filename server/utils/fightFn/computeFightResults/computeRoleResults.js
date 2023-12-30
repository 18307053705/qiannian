const { FightG } = require("@/global");
const { FIGHT_TYPE_EUNM, FIGHT_STATE_EUNM } = FightG;
module.exports = {
    /**
     * 计算自身结果
     * @param req 
     * @param res
     * @returns state 0:战斗中,1:胜利,2:失败
     */
    computeRoleResults: function (req, res) {
        const roleInfo = RoleG.getRoleGlobal(req, res);
        const { fightInfo, fightRankInfo } = FightG.getFightGlobal(req, res, roleInfo.role_id);
        const { player, roundAttr, type, id } = fightInfo;
        const { role } = roundAttr;
        let state = FIGHT_STATE_EUNM.inCombat;
        player.attr = {
            ...player.attr,
            life: role.life,
            mana: role.mana,
        }
        if (!role.life) {
            // 战斗失败
            state = FIGHT_STATE_EUNM.fail;
            // 组队战斗
            if (type === FIGHT_TYPE_EUNM.rank) {
                const { players } = fightRankInfo;
                if (players.length === 1) {
                    FightG.deleteFightRankGlobal(id);
                } else {
                    FightG.updataFightRankInfoGlobal(req, res, { players: players.filter(({ role_id }) => role_id !== roleInfo.role_id) })
                }
            }
            // 非切磋玩家死亡位置移动至云荒大陆
            if (type !== FIGHT_TYPE_EUNM.duel) {
                RoleG.updataRoleGlobal(req, res, { address: '40000,0,0' });
            }

        }
        FightG.updataFightInfoGlobal(req, res, { player, state });
        return state;
    },

};
