const { FightG } = require("../../global");
// 无需验证战斗的请求
const roleFightApiList = [
    "/api/chat/get",
    "/api/fight/creatFight",
    "/api/fight/fightDir",
    "/api/fight/continue",
    "/api/fight/getFightConfig",
    "/api/fight/setFightConfig",
    "/api/player/playerFightDir",
    "/api/player/creatPlayerFight",
    "/api/player/exitFight",
    "/api/fight/exitFight"
];

module.exports = {
    /**
     * 判断是否处于战斗中
     * @param {*} req
     * @param {*} res
     * @returns true 通过
     */
    roleFightCheck: function (req, res) {
        if (roleFightApiList.includes(req.originalUrl)) {
            return true;
        }
        const { fightMap } = FightG.getFightGlobal(req, res);
        if (fightMap) {
            res.send({
                code: 0,
                path: (fightMap.state === 1 || fightMap.state === 2) ? "fight" : "playerFight"
            })
            return false
        }
        return true;
    }
};
