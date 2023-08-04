const { fightFn } = require('../../utils');

module.exports = {
    /**
     * 继续战斗
     */
    continueFight: (req, res) => {
        if (!fightFn.checkContinueFight(req, res)) {
            res.send({
                code: 0,
                message: "无法继续"
            });
            return;
        }
        const { fightInfo, fightMap } = fightFn.creatFight(req, res, { continueDir: true });
        const { player } = fightMap;
        const { players } = fightInfo;
        res.send({
            code: 0,
            data: {
                fightInfo: {
                    ...fightInfo,
                    players: [player, ...players.filter(({ roleId }) => player.roleId !== roleId)],
                },
                fightMap
            }
        })

    }
};