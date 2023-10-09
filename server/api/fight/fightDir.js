const { fightFn } = require('../../utils');
// const { FightG } = require('../../global');

module.exports = {
    /**
     * 发送战斗指令
     */
    fightDir: async (req, res) => {
        // 初始化回合文案
        fightFn.initRoundInfo(req, res);
        const { id = 0, p = 0 } = req.body;
        // 出招前检验
        if (fightFn.computeFightResults(req, res)) {
            return;
        }
        // 放弃战斗
        if (p === 9 && id === 1 && fightFn.escapeFight(req, res)) {
            return
        }
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
            fightFn.drugDir(req, res, id);
        }
        // 普通攻击
        if (p === 0 || p === 1) {
            fightFn.playerAttack(req, res, id)
        }
        // 宠物攻击
        fightFn.petAttack(req, res);
        // 出招后检验
        if (fightFn.computeFightResults(req, res)) {
            return;
        }
        // 怪物出招
        fightFn.rivalAttack(req, res);
        // 回合结束校验
        if (fightFn.computeFightResults(req, res)) {
            return;
        }
        // 灵血
        fightFn.lingXue(req,res);

        fightFn.getFightResults(req, res);

    }
};