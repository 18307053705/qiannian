// const { getFightReward } = require('./getFightReward');
const { FightG, GrandG } = require('../../global');
module.exports = {
    /**
     * 判断自身或对手是否阵亡结果
     * @param {*} req 
     * @param {*} res
     * @returns {boolean} 有返回值代表存在阵亡方,战斗结束
     */
    getDeathResulst: function (req, res) {
        // 战斗指令信息
        const { currentDir } = GrandG.getDirGlobal(req, res);
        const { role_id, type, role_name } = currentDir;
        // 我的信息
        const { fightMap: myFightMap } = FightG.getFightGlobal(req, res);
        // 对手的信息
        const { fightMap: tFightMap } = FightG.getFightGlobal(req, res, role_id);
        // 对方阵亡,并且以释放战斗
        if (!tFightMap || tFightMap.state !== 0) {
            FightG.updataFightMapGlobal(req, res, {
                state: 1,
                results: myFightMap.results || {
                    text: type === 3 ? `${role_name}已经战败了!` : `${role_name}已经阵亡了!`
                }
            });
            return true;
        }
        // 对方阵亡,未释放战斗
        if (tFightMap.player.attr.life <= 0) {
            FightG.updataFightMapGlobal(req, res, {
                state: 1,
                results: myFightMap.results || {
                    text: type === 3 ? `${role_name}已经战败了!` : `${role_name}已经阵亡了!`
                }
            });
            return true;
        }
        // 我方阵亡
        if (myFightMap.player.attr.life <= 0) {
            FightG.updataFightMapGlobal(req, res, { state: 2 });
            return true;
        }
    },

};
