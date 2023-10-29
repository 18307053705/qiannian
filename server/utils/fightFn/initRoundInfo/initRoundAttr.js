const { FightG } = require('../../../global')
const { randomAttr } = require('./randomAttr');
module.exports = {
    /**
     * 创建战斗属性
     * @param req 
     * @param res 
     */
    initRoundAttr: function (req, res,) {
        const { fightMap, fightInfo } = FightG.getFightGlobal(req, res);
        const { type, id, player } = fightMap;
        const { rivals } = fightInfo;
        const { attr, pet } = player;
        // 自身属性
        const role = {
            attr: randomAttr(attr),
            life: attr.life,
            life_max: attr.life_max,
            mana: attr.mana,
            mana_max: attr.mana_max
        }
        // 宠物属性
        let petAttr = undefined;
        if (pet) {
            petAttr = {
                attr: randomAttr(pet.attr),
                art: pet.art
            };
        }
        // 对手属性
        const rival = {};
        // 人机对战
        if (type === 1 || type === 2) {
            rival['num'] = 0;
            rival['list'] = rivals.map(({ attr }) => {
                if (attr.life > 0) {
                    rival['num'] += 1;
                }
                return { life: attr.life, life_max: attr.life_max, mana: attr.mana, mana_max: attr.mana_max };
            });
            rival['attr'] = randomAttr(rivals[0].attr);
        }
        // 玩家对战
        if (type === 3 || type === 4) {
            const { fightMap: tFightMap } = FightG.getFightGlobal(req, res, id);
            const { attr } = tFightMap.player;
            rival['list'] = [{
                life: attr.life,
                life_max: attr.life_max,
                mana: attr.mana,
                mana_max: attr.mana_ma
            }]
            rival['attr'] = randomAttr(attr);
        }

        return {
            role,
            pet: petAttr,
            rival
        }
    },

};
