const { FightG } = require("../../global");
module.exports = {
    /**
     * 计算出手间隔
     * @param {*} req 
     * @param {*} res 
     * @param {*} currentDir 战斗指令 
     * @returns {boolean} true 可出招
     */
    computeTime: function (req, res, currentDir) {

        // 我的信息
        const { fightMap: myFightMap } = FightG.getFightGlobal(req, res);
        // 判断是否间隔一秒
        if (!myFightMap.intervalTime || new Date() - myFightMap.intervalTime >= 500) {
            return true;
        }
        const { role_id } = currentDir;
        // 对手的信息
        const { fightMap: tFightMap } = FightG.getFightGlobal(req, res, role_id);
        res.send({
            code: 0,
            data: {
                tFightMap,
                myFightMap,
            },
            message: "你出招太快了！"
        })

    },

};
