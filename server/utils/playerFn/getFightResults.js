// const { getFightReward } = require('./getFightReward');
const { FightG, GrandG } = require('../../global');
module.exports = {
    /**
     * 获取战斗结果
     * @param {*} req 
     * @param {*} res
     * @param {*} resInfo 可选值,战斗结果信息
     * @returns {boolean} 有返回值代表战斗结束
     */
    getFightResults: function (req, res) {
        // 我的信息
        const { fightMap: myFightMap } = FightG.getFightGlobal(req, res);
        const { role_id, type, role_name } = myFightMap.rivalMold;
        // 对手的信息
        const { fightMap: tFightMap } = FightG.getFightGlobal(req, res, role_id);
        const { attr } = tFightMap.player;
        if (attr.life > 0) {
            return false;
        }
        FightG.updataFightMapGlobal(req, res, {
            state: 1,
            results: {
                text: type === 3 ? `${role_name}已经战败了!` : `${role_name}已经阵亡了!`
            }
        });
        return true;
    },

};
