const { FightG, GrandG } = require("@/global");
const { creatPlayer } = require("./creatPlayer");

module.exports = {
    /**
     * 创建玩家战斗
     * @param {*} req 
     * @param {*} res 
     */
    creatPlayerFight: function (req, res) {
        const { role_id: i_roleId, role_name } = RoleG.getRoleGlobal(req, res);
        // 不存在则创建战斗
        const { currentDir } = GrandG.getDirGlobal(req, res);
        // 对方的角色id,是否死斗
        const { role_id, type } = currentDir;
        const players = creatPlayer(req, res, type);
        const tPlayer = creatPlayer(req, res, type, role_id);

        const fightMaps = {
            id: role_id,
            type,
            player: players.completePlayer,
            template: { role_id, name: tPlayer.completePlayer.name },
            state: 0,
            buffs: {},
        };
        const tFightMaps = {
            id: i_roleId,
            type,
            player: tPlayer.completePlayer,
            template: { role_id: i_roleId, name: role_name },
            state: 0,
            buffs: {},
        };
        // 创建化全局战斗
        FightG.setFightGlobal(req, res, fightMaps, {});
        FightG.setFightGlobal(req, res, tFightMaps, {}, role_id);

        // 保存我方id到对方战斗指令
        GrandG.setDirGlobal(req, res, { currentDir: { type, role_id: i_roleId, role_name, type } }, { roleId: role_id });
    },

};
