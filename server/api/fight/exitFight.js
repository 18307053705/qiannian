const { fightFn } = require('../../utils');
const { GrandG } = require('../../global');

module.exports = {
    /**
     * 退出战斗
     */
    exitFight: async (req, res) => {
        const { currentDir } = GrandG.getDirGlobal(req, res);
        const { ext } = currentDir;
        fightFn.releaseFight(req, res);

        res.send({
            code: 0,
            path: ext.path || '/grand',
        });
    }
}