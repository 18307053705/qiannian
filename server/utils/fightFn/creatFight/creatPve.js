const { FightG } = require("@/global");
const { creatFreak } = require("./creatFreak");
const { creatPlayer } = require("./creatPlayer");
const { FIGHT_STATE_EUNM } = FightG;
module.exports = {
    /**
     * 创建战斗
     * @param req
     * @param res
     */
    creatPve: function (req, res) {
        // 创建化全局战斗
        const { role_id } = RoleG.getRoleGlobal(req, res);
        const players = creatPlayer(req, res);
        const { rivals, template } = creatFreak(req, res);
        const fightInfo = {
            id: role_id,
            type: 1,
            player: players.completePlayer,
            rivals: rivals,
            template,
            state: FIGHT_STATE_EUNM.inCombat,
            buffs: {},
        };
        FightG.setFightGlobal(req, res, fightInfo);
    },
};
