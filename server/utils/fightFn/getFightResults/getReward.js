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
        const { FIGHT_TYPE_EUNM } = FightG;
        if (type === FIGHT_TYPE_EUNM.pve || type === FIGHT_TYPE_EUNM.rank) {
            getFreakReward(req, res);
        }
        if (type === FIGHT_TYPE_EUNM.duel || type === FIGHT_TYPE_EUNM.kill) {
            getDuelReward(req,res);
        }
    },

};
