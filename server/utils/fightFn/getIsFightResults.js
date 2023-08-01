const { getFightReward } = require('./getFightReward');
const { FightG } = require('../../global');
module.exports = {
    /**
     * 获取战斗结果
     * @param {*} req 
     * @param {*} res
     * @returns {boolean} 有返回值代表战斗结束
     */
    getFightResults: function (req, res) {
        const { fightInfo, fightMap } = FightG.getFightGlobal(req, res);
        const { rivals } = fightInfo;
        let state = 1;

        rivals.forEach(({ attr }) => {
            if (attr.life > 0) {
                state = 0;
            }
        })

        // 战斗胜利获取奖励,更新战斗状态
        if (state === 1) {
            const { results, tasks } = getFightReward(req, res);
            const fightMapData = FightG.updataFightMapGlobal(req, res, { state: 1, results });
            res.send({
                code: 0,
                data: {
                    fightMap: {
                        tasks,
                        ...fightMapData
                    }

                }
            });
            return true;
        }

        // 战斗失败,更新战斗状态
        if (fightMap.state === 2 || fightMap.player.attr.life === 0) {
            const fightMapdata = FightG.updataFightMapGlobal(req, res, { state: 2 });
            res.send({
                code: 0,
                data: {
                    fightMap: fightMapdata
                }
            });
            return true;
        }
    },

};
