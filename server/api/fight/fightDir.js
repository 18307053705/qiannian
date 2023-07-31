const { fightFn } = require('../../utils');
const { FightG } = require('../../global');

module.exports = {
    /**
     * 创建战斗
     */
    fightDir: async (req, res) => {
        const { id = 0, p = 0 } = req.body;
        const { fightMap, fightInfo } = FightG.getFightGlobal(req, res);
        // 放弃战斗
        if (p === 9 && id === 1) {
            return;
        }
        // 捉宠物
        if (p === 9 && id === 2) {
            
        }
        // 使用物品
        if (p === 1) {

        }
        // 普通攻击
        if (p === 0 && id === 0) {

        }
        // 技能攻击
        if (p === 1) {

        }




        const { fightInfo, fightMap } = fightFn.creatFight(req, res);
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