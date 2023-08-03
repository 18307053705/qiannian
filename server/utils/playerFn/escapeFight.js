const { FightG } = require("../../global");
module.exports = {
    /**
     * 逃跑
     * @param {*} req 
     * @param {*} res 
     * @param {*} fightRound 回合信息
     * @param {*} currentDir 战斗指令 
     * @returns {boolean} true 可出招
     */
    escapeFight: function (req, res, fightRound, currentDir) {
        if (Math.floor(Math.random() * 4) === 0) {
            const { role_id } = currentDir;
            FightG.updataFightMapGlobal(req, res, { state: 1, results: { text: "对方直接跑路了！！！" } }, role_id)
            FightG.deleteFightMapGlobal(req, res);
            res.send({
                code: 0,
                path: '/grand',
                success: '逃跑成功！'
            });
            return true;
        }
        fightRound.message = '开溜失败！！'
    }

};
