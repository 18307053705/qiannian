const { fightFn } = require('../../utils');
const { FightG } = require('../../global');

module.exports = {
    /**
     * 发送战斗指令
     */
    fightDir: async (req, res) => {
        const { id = 0, p = 0 } = req.body;
        const { fightMap, fightInfo } = FightG.getFightGlobal(req, res);
        const { rivalMold, player } = fightMap;
        const { players, rivals } = fightInfo;
        // 放弃战斗
        if (p === 9 && id === 1) {
            fightFn.releaseFight(req, res);
            res.send({
                code: 0,
                path: '/grand'
            });
            return
        }
        // 开始计算战斗
        // 定义回合文案
        const fightRound = {
            text: '', // 出招文案
            // rival_text: '', // 怪物出招文案
            buffText: [], // buff信息
            dps: 0, // 造成的伤害
            mana: '', // 消耗的法力
            life: '',// 消耗的生命
            statu: 0 // 结果
        }
        // 我方属性
        const playerAttr = fightFn.creatFightAttr(req, res, player.attr);
        // 敌方属性
        const rivalAttr = fightFn.creatFightAttr(req, res, rivals[0].attr);

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
            fightFn.playerNormalDir(req, res, playerAttr, rivalAttr, fightRound);
        }
        // 技能攻击
        if (p === 1) {

        }
        // 获取战斗结果
        if (fightFn.getFightResults(req, res)) {
            return;
        }

        const { fightMap: dataMap, fightInfo: dataInfo } = FightG.getFightGlobal(req, res);
        res.send({
            code: 0,
            data: {
                fightInfo: {
                    ...dataInfo,
                    players: [fightMap.player, ...dataInfo.players.filter(({ roleId }) => fightMap.player.roleId !== roleId)],
                },
                fightMap: dataMap
            }
        })

    }
};