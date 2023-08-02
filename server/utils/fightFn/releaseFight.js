const { FightG, RoleG } = require("../../global");
module.exports = {
    /**
     * 放弃战斗
     * @param {*} req 
     * @param {*} res
     */
    releaseFight: function (req, res) {
        const { fightInfo, fightMap } = FightG.getFightGlobal(req, res);
        if (fightMap) {
            const { players } = fightInfo
            // 角色信息
            const { role_id } = RoleG.getRoleGlobal(req, res);
            const { player } = fightMap;
            const { attr } = player;
            // 更新角色
            RoleG.updataRoleGlobal(req, res, {
                life: attr.life,
                mana: attr.mana
            })
            //  释放战斗信息池
            // 判断是否为本次战斗中最后一个玩家,否则移除自己即可
            if (players.length === 0) {
                FightG.deleteFightInfoGlobal(req, res);
            } else {
                FightG.updataFightInfoGlobal(req, res, { players: players.filter(({ id }) => id !== role_id) });
            }
            // 释放战斗池id
            FightG.deleteFightMapGlobal(req, res);
        }
    }
};
