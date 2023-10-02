const { computeRole } = require('./computeRole');
const { computeRival } = require('./computeRival');
const { FightG } = require('../../../global');
module.exports = {
    /**
     * 计算战斗结果
     * @param req 
     * @param res
     */
    computeFightResults: function (req, res) {
        let state = computeRival(req, res);
        // 战斗中-计算玩家自身属性
        if (state === 0) {
            state = computeRole(req, res);
        }
        // 战斗胜利
        if (state === 1) {
            const results = getFightReward(req, res);
        }
        // 战斗失败
        if (state === 2) {

        }
        // 否则结束站
        // let state = computeRole(req, res);
        // // 战斗胜利获取奖励,更新战斗状态
        // if (state === 1) {
        //     const results = getFightReward(req, res);
        //     const fightMapData = FightG.updataFightMapGlobal(req, res, {
        //         state: 1,
        //         results: {
        //             ...results,
        //             ...resInfo
        //         }
        //     });
        //     res.send({
        //         code: 0,
        //         data: {
        //             fightMap: fightMapData

        //         }
        //     });
        //     return true;
        // }

        // // 战斗失败,更新战斗状态
        // if (fightMap.state === 2 || fightMap.player.attr.life === 0) {
        //     const fightMapdata = FightG.updataFightMapGlobal(req, res, { state: 2 });
        //     res.send({
        //         code: 0,
        //         data: {
        //             fightMap: fightMapdata
        //         }
        //     });
        //     return true;
        // }
    },

};
