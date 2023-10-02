const { fightFn, fightsFn } = require('../../utils');
const { FightG } = require('../../global');

module.exports = {
    /**
     * 发送战斗指令
     */
    fightDir: async (req, res) => {
        const { id = 0, p = 0 } = req.body;
        // 组队的情况存在队友击杀,进来计算战斗结果
        if (fightFn.getFightResults(req, res)) {
            return;
        }
        // 放弃战斗
        if (p === 9 && id === 1) {
            fightFn.releaseFight(req, res);
            res.send({
                code: 0,
                path: '/grand'
            });
            return
        }
        // 初始化回合文案
        fightsFn.initRoundInfo(req, res);
        // res.send({
        //     code: 0,
        //     data: FightG.getFightGlobal(req, res)
        // })
        // return

        // 开始计算战斗
        // 定义回合文案
        // const fightRound = {
        //     message: '', // 错误提示
        //     dps: '', // 造成的伤害
        //     rivalDps: 0, // 怪物伤害
        //     life: 0, // 恢复的生命
        //     mana: 0, // 恢复的法力
        //     statu: 0 // 结果
        // }
        // // buffs计算
        // fightFn.computeBuffs(req, res);

        // 捉宠物
        if (p === 9 && id === 2) {
            // fightRound.message = await fightFn.catchPet(req, res);
            // // 无返回即为捕捉成功
            // if (!fightRound.message) {
            //     return
            // }
        }

        // 使用物品
        if (p === 2) {
            // fightRound.message = fightFn.drugDir(req, res, id);
        }

        // 普通攻击
        if (p === 0 || p === 1) {
            fightsFn.playerAttack(req, res, id)
        }
        // 宠物攻击
        fightsFn.petAttack(req, res);
        // 怪物出招
        fightsFn.rivalAttack(req, res);
        
        const fight = FightG.getFightGlobal(req, res);
        res.send({
            code: 0,
            data: fight
        })
        // 技能攻击
        // if (p === 1) {
        //     fightFn.playerArtDir(req, res, playerAttr, rivalAttr, fightRound, id);
        // }

        // 宠物攻击
        // fightFn.petArtDir(req, res, rivalAttr, fightRound)
        // if (fightFn.petArtDir(req, res, rivalAttr, fightRound)) {
        //     return;
        // }
        // 获取战斗结果
        // if (fightFn.getFightResults(req, res)) {
        //     return;
        // }

        // // 怪物出招
        // if (fightFn.rivalNormalDir(req, res, rivalAttr, playerAttr, fightRound)) {
        //     return;
        // }
        // 灵血补充
        // fightFn.lingXue(req, res, fightRound);

        // const { fightMap: dataMap, fightInfo: dataInfo } = FightG.getFightGlobal(req, res);
        // const { life, mana } = fightRound;
        // res.send({
        //     code: 0,
        //     data: {
        //         fightInfo: {
        //             ...dataInfo,
        //             players: [dataMap.player, ...dataInfo.players.filter(({ roleId }) => fightMap.player.roleId !== roleId)],
        //         },
        //         fightMap: dataMap,
        //         fightRound: {
        //             ...fightRound,
        //             life: life > 0 ? `[+${life}]` : `[${life}]`,
        //             mana: mana > 0 ? `[+${mana}]` : `[${mana}]`,
        //         }
        //     }
        // })

    }
};