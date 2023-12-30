const { FightG } = require("../../../global");
module.exports = {
    /**
     * 计算自身结果
     * @param req 
     * @param res
     * @returns state 0:战斗中,1:胜利,2:失败
     */
    computeRoleResults: function (req, res) {
        const { FIGHT_TYPE_EUNM } = FightG;
        const { fightMap } = FightG.getFightGlobal(req, res);
        const { player, roundAttr, type } = fightMap;
        const { role } = roundAttr;
        let state = fightMap.state;
        if (state === 0) {
            player.attr = {
                ...player.attr,
                life: role.life,
                mana: role.mana,
            }

            if (!role.life) {
                // 战斗失败
                state = 2;
                if (type !== FIGHT_TYPE_EUNM.duel) {
                    // 非切切磋死亡，位置移动至云荒大陆
                    RoleG.updataRoleGlobal(req, res, { address: '40000,0,0' });
                }
            }
            FightG.updataFightMapGlobal(req, res, { player, state });
        }
        return state;
    },

};
