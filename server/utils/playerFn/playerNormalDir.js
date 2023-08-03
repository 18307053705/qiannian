const { computeFightDps } = require('./computeFightDps');
const { victoryFight } = require('./victoryFight');
const { creatFightAttr } = require('../fightFn/creatFightAttr');
const { FightG, GrandG } = require('../../global');
module.exports = {
    /**
     * 普通攻击
     * @param {*} req 
     * @param {*} res 
     * @param {*} playerAttr 我的属性
     * @param {*} rivalAttr 怪物属性
     * @param {*} fightRound 回合信息
     * @returns {boolean} true 代表击杀了对方
     */
    playerNormalDir: function (req, res, fightRound, rise = 100) {
        // 战斗指令信息
        const { currentDir } = GrandG.getDirGlobal(req, res);
        const { role_id } = currentDir;
        // 我的信息
        const { fightMap } = FightG.getFightGlobal(req, res);
        // 对手的信息
        const { fightMap: rivalMap } = FightG.getFightGlobal(req, res, role_id);
        // 我方属性
        const playerAttr = creatFightAttr(req, res, fightMap.player.attr);
        // 敌方属性
        const rivalAttr = creatFightAttr(req, res, rivalMap.player.attr);
        let { isHit, dps } = computeFightDps(req, res, playerAttr, rivalAttr, rise);
        fightRound['dps'] = `-${dps}`;
        if (isHit && dps > 0) {
            rivalMap.player.attr.life -= dps;
            // 击杀对方
            if (rivalMap.player.attr.life <= 0) {
                victoryFight(req, res, fightMap, rivalMap, currentDir);
                return true;
            }
            FightG.updataFightMapGlobal(req, res, { player: rivalMap.player,dps }, role_id);
            FightG.updataFightMapGlobal(req, res);
        }
    },

};
