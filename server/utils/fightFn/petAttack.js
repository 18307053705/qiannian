const { FightG } = require('../../global');
const { computeFightDps } = require('./computeFightDps');

module.exports = {
    /**
     * 宠物攻击
     * @param req 
     * @param res
     */
    petAttack: function (req, res) {
        const { fightMap } = FightG.getFightGlobal(req, res);
        const { roundAttr, roundText } = fightMap;
        const { pet, rival } = roundAttr;
        if (!pet) { return; }
        // 计算伤害
        const { v, e = '' } = pet.art;
        const [key, vals] = e.split('-');
        const val = Number(vals);
        if (key === 'ignore') {
            // 无视防御
            rivalAttr['dfs'] = rivalAttr['dfs'] * (100 - val) / 100;
        }
        let dps = computeFightDps(pet.attr, rival.attr, v);
        if (dps) {
            if (key === 'atk') {
                // 增伤
                dps = parseInt(dps * (100 + val) / 100);
            }
            if (key === 'life') {
                dps += (pet.attr.life_max * val) / 100;
            }
            let num = 1;
            roundAttr.rival.list = rival.list.map((attr) => {
                const { life } = attr;
                if (life > 0) {
                    // 攻击次数大于0
                    if (num > 0) {
                        num--;
                        const curLife = life - dps > 0 ? life - dps : 0;
                        attr.life = curLife;
                    }
                }
                return attr;
            })
        }
        // 记录宠物伤害
        roundText.pet_dps = `[-${dps}]`;

        FightG.updataFightMapGlobal(req, res, { roundAttr, roundText });
    },

};
