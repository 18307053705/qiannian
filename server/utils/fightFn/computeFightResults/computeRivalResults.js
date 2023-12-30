const { FightG } = require('@/global');
const { FIGHT_TYPE_EUNM, FIGHT_STATE_EUNM } = FightG;
module.exports = {
    /**
     * 计算对手结果
     * @param req 
     * @param res
     * @returns state 0:战斗中,1:胜利,2:失败
     */
    computeRivalResults: function (req, res) {
        const { fightInfo, fightRankInfo } = FightG.getFightGlobal(req, res);
        const { type, id, roundAttr } = fightInfo;
        const { rival } = roundAttr;
        let state = FIGHT_STATE_EUNM.inCombat;
        // 玩家 vs 人机
        if (type === FIGHT_TYPE_EUNM.pve) {
            const { rivals } = fightInfo;
            const list = rival.list.filter(({ life, mana }, index) => {
                const { attr } = rivals[index];
                rivals[index]['attr'] = {
                    ...attr,
                    life,
                    mana
                }
                return life;
            })
            if (!list.length) {
                state = FIGHT_STATE_EUNM.victory;
            }
            // 更新战斗状态与怪物信息
            FightG.updataFightInfoGlobal(req, res, { state, rivals });
        }
        // 多玩家 vs 人机
        if (type === FIGHT_TYPE_EUNM.rank) {
            const { rivals, players } = fightRankInfo;
            const list = rival.list.filter(({ life, mana }, index) => {
                const { attr } = rivals[index];
                rivals[index]['attr'] = {
                    ...attr,
                    life,
                    mana
                }
                return life;
            })
            if (!list.length) {
                state = FIGHT_STATE_EUNM.victory;
                FightG.deleteFightRankGlobal(id);
                // 所有人改为胜利
                players.forEach(({ role_id }) => {
                    FightG.updataFightInfoGlobal(req, res, { state }, role_id);
                })
            }
            // 更新怪物信息
            FightG.updataFightRankInfoGlobal(req, res, { rivals });
        }
        // 玩家 vs 玩家
        if (type === FIGHT_TYPE_EUNM.duel || type === FIGHT_TYPE_EUNM.kill) {
            const { fightInfo: tFightInfo } = FightG.getFightGlobal(req, res, id) || {};
            const { player } = tFightInfo;
            const { life, mana } = rival.list[0];
            player.attr = {
                ...player.attr,
                life,
                mana
            }
            // 判断对方是否死亡
            if (!life) {
                // 我方状态胜利
                state = FIGHT_STATE_EUNM.victory;
                // 对方状态失败
                FightG.updataFightInfoGlobal(req, res, { state });
                FightG.updataFightInfoGlobal(req, res, { state: FIGHT_STATE_EUNM.fail, player }, id);
                if (type === FIGHT_TYPE_EUNM.kill) {
                    // 若死斗，对方位置移动至云荒大陆
                    RoleG.updataRoleGlobal(req, res, { address: '40000,0,0' }, id);
                }
            }
        }
        return state;
    }
};
