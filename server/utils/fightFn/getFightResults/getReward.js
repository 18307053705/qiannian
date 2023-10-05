const { FightG } = require('../../../global');
const { getFreakReward } = require('./getFreakReward');
const { getDuelReward } = require('./getDuelReward');

module.exports = {
    /**
     * 获取战斗奖励
     * @param  req 
     * @param  res
     */
    getReward: function (req, res, type) {
        const { FIGHT_TYPE } = FightG;
        if (type === FIGHT_TYPE.pve || type === FIGHT_TYPE.rank) {
            getFreakReward(req, res);
        }
        if (type === FIGHT_TYPE.duel || type === FIGHT_TYPE.kill) {
            getDuelReward(req,res);
        }
    },

};
