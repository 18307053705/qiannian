const { FightG } = require('../../../global');
module.exports = {
    /**
     * 计算对手结果
     * @param req 
     * @param res
     * @returns state 0:战斗中,1:胜利,2:失败
     */
    computeRival: function (req, res) {
        const { fightMap, fightInfo } = FightG.getFightGlobal(req, res);
        const { type, id, roundAttr } = fightMap;
        const { rival } = roundAttr;
        let state = fightMap.state;
        // 人机对战
        if (type === 1 || type === 2) {
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
            // 判断怪物是否全部死亡
            if (!list.length) {
                state = 1;
                FightG.updataFightMapGlobal(req, res, { state });
            }
            FightG.updataFightInfoGlobal(req, res, { rivals });
        }
        // 玩家对战
        if (type === 3 || type === 4) {
            const { tFightMap } = FightG.getFightMap(id);
            const { player } = tFightMap;
            const { life, mana } = rival[0];
            player.attr = {
                ...player.attr,
                life,
                mana
            }
            // 判断玩家是否死亡
            if (!life) {
                state = 1;
                tFightMap.state = 2;
                FightG.updataFightMapGlobal(req, res, { state });
            }
            FightG.updataFightMapGlobal(req, res, { player, state: tFightMap.state }, id);
        }
        return state;
    }
};
