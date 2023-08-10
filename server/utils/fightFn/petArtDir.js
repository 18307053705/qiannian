const { PetG, FightG } = require('../../global');
const { creatFightAttr } = require('./creatFightAttr');
const { computeFightDps } = require('./computeFightDps');
const { computePetAttr } = require('../petFn/computePetAttr');

module.exports = {
    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @param {*} rivalAttr 怪物属性
     * @param {*} fightRound 
     */
    petArtDir: function (req, res, rivalAttr, fightRound) {
        const pet = PetG.getPetGlobal(req, res);
        // 没有出战宠物，不计算宠物伤害
        if (!pet) {
            return;
        }
        const attr = computePetAttr(pet);
        const petAttr = creatFightAttr(req, res, attr);
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
            let num = 1;
            fightRound['peDps'] = `[-${dps}]`;
            const { fightInfo } = FightG.getFightGlobal(req, res);
            const { rivals } = fightInfo;
            const curRivals = rivals.map((rival) => {
                const { life } = rival.attr;
                if (life > 0) {
                    // 攻击次数大于0
                    if (num > 0) {
                        num--;
                        const curLife = life - dps > 0 ? life - dps : 0;
                        rival.attr.life = curLife;
                    }

                }
                return rival;
            })
            FightG.updataFightInfoGlobal(req, res, { rivals: curRivals });
            return curRivals;
        }
    }
}

