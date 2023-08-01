const { fightFn } = require('../../utils');

module.exports = {
    /**
     * 创建战斗
     */
    continueFight: (req, res) => {
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