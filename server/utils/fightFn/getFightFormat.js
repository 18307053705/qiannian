const { FightG } = require('@/global');
const { FIGHT_TYPE_EUNM } = FightG;

function getRivals(rivals) {
    return rivals.map(({ attr }) => ({
        life: attr.life,
        life_max: attr.life_max,
    }))
}

function getPlayers(players) {
    return players.map(({ role_id, name, attr, life, life_max }) => ({
        role_id,
        name,
        life: life || attr.life,
        life_max: life_max || attr.life_max,
    }))
}


function getPlayer(player) {
    const { attr, pet, art } = player;
    return {
        art,
        life: attr.life,
        life_max: attr.life_max,
        mana: attr.mana,
        mana_max: attr.mana_max,
        pet: pet ? { name: pet.name } : undefined
    }
}

module.exports = {
    /**
     * 返回响应客户端数据
     * @param req 
     * @param res
     */
    getFightFormat: function (req, res) {
        const { fightInfo, fightRankInfo } = FightG.getFightGlobal(req, res);
        const { id, type, player, buffs, rivals, state, roundText, reward, template } = fightInfo;
        const base = {
            buffs,
            state,
            roundText,
            template: template ? { name: template.name } : undefined,
        }
        if (state !== 0) {
            return {
                state,
                reward,
                continue: fightInfo.continue,
                escape: fightInfo.escape,
                type
            }
        }
        // 玩家 vs 人机
        if (type === FIGHT_TYPE_EUNM.pve) {
            return {
                ...base,
                player: getPlayer(player),
                rivals: getRivals(rivals),
                players: getPlayers([player]),
            };
        }
        // 多玩家 vs 人机
        if (type === FIGHT_TYPE_EUNM.rank) {
            return {
                ...base,
                player: getPlayer(player),
                rivals: getRivals(fightRankInfo?.rivals || []),
                players: getPlayers(fightRankInfo?.players),
                buffs: fightRankInfo?.buffs,
            };
        }
        // 玩家 vs 玩家
        const { fightInfo: tFightInfo } = FightG.getFightGlobal(req, res, id) || {};
        return {
            ...base,
            player: getPlayer(player),
            rivals: getRivals([{ attr: tFightInfo?.player.attr }]),
            players: getPlayers([player]),
        }
    },

};
