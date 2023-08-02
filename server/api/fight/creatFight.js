const { fightFn } = require('../../utils');

module.exports = {
    /**
     * 创建战斗
     */
    creatFight: (req, res) => {
        const { fightInfo, fightMap } = fightFn.creatFight(req, res);
        if(fightFn.getFightResults(req,res)){
            return;
        }
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