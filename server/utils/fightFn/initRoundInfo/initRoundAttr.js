const { FightG } = require('@/global')
const { randomAttr } = require('./randomAttr');
const { FIGHT_TYPE_EUNM } = FightG;
module.exports = {
    /**
     * 创建战斗属性
     * @param req 
     * @param res 
     */
    initRoundAttr: function (req, res,) {
        const { fightInfo, fightRankInfo } = FightG.getFightGlobal(req, res);
        const { type, id, player } = fightInfo;
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
        if (type === FIGHT_TYPE_EUNM.pve || type === FIGHT_TYPE_EUNM.rank) {
            const rivals = type ===  FIGHT_TYPE_EUNM.rank ? fightRankInfo.rivals : fightInfo.rivals;
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
        if (type === FIGHT_TYPE_EUNM.duel || type === FIGHT_TYPE_EUNM.kill) {
            const { fightInfo: tFightInfo } = FightG.getFightGlobal(req, res, id);
            const { attr } = tFightInfo.player;
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
