const { FightG } = require("../../../global");
module.exports = {
    /**
     * 更新角色属性
     * @param {*} req 
     * @param {*} res
     */
    updateRoleAttr: function (req, res) {
        const { fightMap } = FightG.getFightGlobal(req, res);
        const { player, update, type } = fightMap;
        if (!update && type !== FightG.FIGHT_TYPE_EUNM.duel) {
            RoleG.updataRoleGlobal(req, res, {
                life: player.attr.life,
                mana: player.attr.mana
            })
            FightG.updataFightMapGlobal(req, res, { update: true })
        }


    }
};
