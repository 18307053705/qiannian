const { FightG } = require('../../../global');
const { getReward } = require('./getReward');
const { updateRoleAttr } = require('./updateRoleAttr');
const { getFightFormat } = require('./getFightFormat');
module.exports = {
    /**
     * 获取战斗结果
     * @param req 
     * @param res
     */
    getFightResults: function (req, res) {
        const { FIGHT_TYPE } = FightG;
        const { fightMap } = FightG.getFightGlobal(req, res);
        const { type, state, reward, update } = fightMap;
        // 获取战斗奖励
        if (state === 1 && !reward) {
            getReward(req, res, type)
        }
        // 战斗结束,更新角色属性
        if (state !== 0 && !update && type !== FIGHT_TYPE.duel) {
            updateRoleAttr(req, res);
        }
        // 返回给客户端的数据
        const data = getFightFormat(req, res);
        res.send({
            code: 0,
            data
        })

    },

};
