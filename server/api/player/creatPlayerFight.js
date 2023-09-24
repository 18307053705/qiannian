
const { FightG, GrandG } = require("../../global");
const { getFightG } = require("../../global/fightG/getFiht");
const { playerFn } = require("../../utils");

module.exports = {
    creatPlayerFight: function (req, res) {
        const { currentDir } = GrandG.getDirGlobal(req, res);
        // 创建玩家战斗
        playerFn.creatFight(req, res);
        const { fightMap: myFightMap } = FightG.getFightGlobal(req, res);
        const { fightMap: tFightMap } = FightG.getFightGlobal(req, res, currentDir.role_id);

        res.send({
            code: 0,
            data: {
                myFightMap,
                tFightMap,
            }
        })
    }
}