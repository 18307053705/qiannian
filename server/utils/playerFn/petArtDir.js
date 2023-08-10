const { PetG, FightG,GrandG } = require('../../global');
const { creatFightAttr } = require('./creatFightAttr');
const { computeFightDps } = require('./computeFightDps');
const { computePetAttr } = require('../petFn/computePetAttr');
const { victoryFight } = require('./victoryFight');
module.exports = {
    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @param {*} fightRound 
     */
    petArtDir: function (req, res, fightRound) {
        const pet = PetG.getPetGlobal(req, res);
        // 没有出战宠物，不计算宠物伤害
        if (!pet) {
            return;
        }
        const attr = computePetAttr(pet);
        const petAttr = creatFightAttr(req, res, attr);
         // 战斗指令信息
         const { currentDir } = GrandG.getDirGlobal(req, res);
         const { role_id } = currentDir;
         // 我的信息
         const { fightMap } = FightG.getFightGlobal(req, res);
         // 对手的信息
         const { fightMap: rivalMap } = FightG.getFightGlobal(req, res, role_id);
         // 敌方属性
         const rivalAttr = creatFightAttr(req, res, rivalMap.player.attr);
        const { v, e } = pet.art[0];
        const [key, vals] = e.split('-');
        const val = Number(vals);
        if (key === 'ignore') {
            // 无视防御
            rivalAttr['dfs'] = rivalAttr['dfs'] * (100 - val) / 100;
        }
        let { isHit, dps } = computeFightDps(req, res, petAttr, rivalAttr, v);
        if (isHit) {
            if (key === 'atk') {
                // 增伤
                dps = parseInt(dps * (100 + val) / 100);
            }
            if (key === 'life') {
                dps += (attr.life_max * val) / 100;
            }
            fightRound['peDps'] = `[-${dps}]`;
            rivalMap.player.attr.life -= dps;
            // 击杀对方
            if (rivalMap.player.attr.life <= 0) {
                victoryFight(req, res, fightMap, rivalMap, currentDir);
                return true;
            }
            FightG.updataFightMapGlobal(req, res, { player: rivalMap.player,dps }, role_id);
            FightG.updataFightMapGlobal(req, res);
        }
    }
}

