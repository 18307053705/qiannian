const { computeRoleResults } = require('./computeRoleResults');
const { computeRivalResults } = require('./computeRivalResults');
const { getFreakReward } = require('./getFreakReward');
const { getFightResults } = require('../getFightResults');
module.exports = {
    /**
     * 计算战斗结果
     * @param req 
     * @param res
     */
    computeFightResults: function (req, res) {
        let state = computeRivalResults(req, res);
        // 战斗中-计算玩家自身属性
        if (state === 0) {
            state = computeRoleResults(req, res);
        }
        if (state !== 0) {
            getFightResults(req, res);
            return true;
        }
        return false;
    },

};
