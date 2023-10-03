const { FightG, RoleG } = require("../../../global");
const { creatFreak } = require("./creatFreak");
const { creatPlayer } = require("./creatPlayer");

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
        const fightMap = {
            id: role_id,
            type: 1,
            player: players.completePlayer,
            template,
            state: 0,
            buffs: {},
        };
        const fightInfo = {
            rivals: rivals,
            players: [players.simplePlayer],
            template,
        };
        FightG.setFightGlobal(req, res, fightMap, fightInfo);
    },
};
