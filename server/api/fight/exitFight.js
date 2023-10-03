const { fightFn } = require('../../utils');

module.exports = {
    /**
     * 退出战斗
     */
    exitFight: async (req, res) => {
        fightFn.releaseFight(req, res);
        res.send({
            code: 0,
            path: '/grand',
        });
    }
}