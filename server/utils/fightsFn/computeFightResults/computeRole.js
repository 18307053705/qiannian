const { FightG } = require("../../../global");
module.exports = {
    /**
     * 计算自身结果
     * @param req 
     * @param res
     * @returns state 0:战斗中,1:胜利,2:失败
     */
    computeRole: function (req, res) {
        const { fightMap } = FightG.getFightGlobal(req, res);
        const { player, roundAttr } = fightMap;
        const { role } = roundAttr;
        let state = fightMap.state;
        // 战斗状态
        player.attr = {
            ...player.attr,
            life: role.life,
            mana: role.mana,
        }

        if (!role.life) {
            // 战斗失败
            state = 2;
        }
        FightG.updataFightMapGlobal(req, res, { player, state });
        return  state;
    },

};
