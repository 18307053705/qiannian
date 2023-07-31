const { fightFn } = require('../../utils');
const { FightG } = require('../../global');

module.exports = {
    /**
     * 发送战斗指令
     */
    fightDir: async (req, res) => {
        const { id = 0, p = 0 } = req.body;
        const { fightMap, fightInfo } = FightG.getFightGlobal(req, res);
        const { rivalMold } = fightMap;
        // 放弃战斗
        if (p === 9 && id === 1) {
            return fightFn.releaseFight(req, res);
        }
        // 开始计算战斗
        // 我方属性
        const playerAttr = fightFn.creatFightAttr(req, res, attr);
        // 敌方属性
        const rivalAttr = fightFn.creatFightAttr(req, res, rival[0].attr);

        // 捉宠物
        if (p === 9 && id === 2) {
            // 判断是否可捕捉
            if (rivalMold.pet) {

            }
        }

        // 使用物品
        if (p === 1) {

        }
        // 普通攻击
        if (p === 0 && id === 0) {
            // fightFn
        }
        // 技能攻击
        if (p === 1) {

        }




        // const { fightInfo, fightMap } = fightFn.creatFight(req, res);
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