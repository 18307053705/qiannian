const { FightG, RoleG } = require('../../../global');
module.exports = {
    /**
     * 计算对手结果
     * @param req 
     * @param res
     * @returns state 0:战斗中,1:胜利,2:失败
     */
    computeRivalResults: function (req, res) {
        const { FIGHT_TYPE_EUNM } = FightG;
        const { fightMap, fightInfo } = FightG.getFightGlobal(req, res);
        const { type, id, roundAttr } = fightMap;
        const { rival } = roundAttr;
        let state = fightMap.state;
        // 人机对战
        if (type === FIGHT_TYPE_EUNM.pve || type === FIGHT_TYPE_EUNM.rank && state === 0) {
            const { rivals, players } = fightInfo;
            const list = rival.list.filter(({ life, mana }, index) => {
                const { attr } = rivals[index];
                rivals[index]['attr'] = {
                    ...attr,
                    life,
                    mana
                }
                return life;
            })
            // 判断怪物是否全部死亡,是则直接释放全局FightInfo,且所有人全部战斗池全部改为胜利
            if (!list.length) {
                FightG.deleteFightInfoGlobal(req, res);
                players.forEach(({ role_id }) => {
                    FightG.updataFightMapGlobal(req, res, { state: 1 }, role_id);
                })
            } else {
                FightG.updataFightInfoGlobal(req, res, { rivals });
            }

        }
        // 玩家对战
        if (type === FIGHT_TYPE_EUNM.duel || type === FIGHT_TYPE_EUNM.kill && state === 0) {
            const tFightMap = FightG.getFightMap(id);
            const { player } = tFightMap;
            const { life, mana } = rival.list[0];
            player.attr = {
                ...player.attr,
                life,
                mana
            }
            // 判断玩家是否死亡
            if (!life) {
                // 我方状态胜利
                state = 1;
                // 对方状态失败
                tFightMap.state = 2;
                FightG.updataFightMapGlobal(req, res, { state });
                if (type === FIGHT_TYPE_EUNM.kill) {
                    // 若死斗，对方位置移动至云荒大陆
                    RoleG.updataRoleGlobal(req, res, { address: '40000,0,0' }, { role_id: id });
                }
            }
            FightG.updataFightMapGlobal(req, res, { player, state: tFightMap.state }, id);
        }


        return state;
    }
};
