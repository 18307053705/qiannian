const { FightG } = require('../../global');

module.exports = {
    /**
     * 退出战斗
     */
    exitFight: async (req, res) => {
        FightG.deleteFightMapGlobal(req, res);
        res.send({
            code: 0,
            path: '/grand'
        });
    }
}