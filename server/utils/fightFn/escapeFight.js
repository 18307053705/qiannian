const { FightG } = require("@/global");
const { FIGHT_TYPE_EUNM, FIGHT_STATE_EUNM } = FightG;
module.exports = {
    /**
     * 逃跑
     * @param req 
     * @param res 
     * @returns true 逃跑成功
     */
    escapeFight: function (req, res) {
        const { fightInfo, fightRankInfo } = FightG.getFightGlobal(req, res);
        const { type, id: role_id, player } = fightInfo;
        // 非死斗逃跑概率100%,死斗逃跑概率1/4
        const isEscape = FIGHT_TYPE_EUNM.kill !== type || Math.floor(Math.random() * 4) === 0;
        // 判断是否逃跑成功
        if (isEscape) {
            // 玩家战斗，更新对方信息
            if (type === FIGHT_TYPE_EUNM.duel || type === FIGHT_TYPE_EUNM.kill) {
                FightG.updataFightInfoGlobal(req, res, { state: FIGHT_STATE_EUNM.escape, escape: `${player.name}见势不对,脚底抹油直接跑了!` }, role_id);
            }
            // 组队战斗
            if (type === FIGHT_TYPE_EUNM.rank) {
                const { players } = fightRankInfo;
                if (players.length === 1) {
                    FightG.deleteFightRankGlobal(id);
                } else {
                    FightG.updataFightRankInfoGlobal(req, res, { players: players.filter(({ role_id }) => role_id !== roleInfo.role_id) })
                }
            }
            // 更新角色属性
            RoleG.updataRoleGlobal(req, res, {
                life: player.attr.life,
                mana: player.attr.mana
            })
            FightG.deleteFightGlobal(req, res);
        }
        return isEscape;
    }

};
