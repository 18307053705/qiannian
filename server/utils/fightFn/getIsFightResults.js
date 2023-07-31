const { computeFightDps } = require('./computeFightDps');
const { getFightReward } = require('./getFightReward');
const { FightG } = require('../../global');
module.exports = {
    /**
     * 获取战斗结果
     * @param {*} req 
     * @param {*} res
     */
    getFightResults: function (req, res) {
        const { fightInfo } = FightG.getFightGlobal(req, res);
        const { rivals } = fightInfo;
        let state = 1;
        rivals.forEach(({ attr }) => {
            if (attr.life > 0) {
                state = 0;
            }
        })
        // 战斗胜利获取奖励,更新战斗状态
        if (state === 1) {
            return getFightReward(req, res);
        }
        // 战斗失败,更新战斗状态
        if (state === 2) {
            const fightMap = FightG.updataFightMapGlobal(req, res, { state: 2 });
            return res.send({
                code: 0,
                fightMap
            });
        }
    },

};
