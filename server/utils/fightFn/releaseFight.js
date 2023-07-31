const { FightG, KnapsackG, RoleG } = require("../../global");
module.exports = {
    /**
     * 放弃战斗
     * @param {*} req 
     * @param {*} res
     */
    releaseFight: function (req, res) {
        const { fightInfo, fightMap } = FightG.getFightGlobal(req, res);
        const { role_id } = RoleG.getRoleGlobal(req, res);
        const { players } = fightInfo;
        if (fightMap && fightMap.state === 0) {
            // 背包信息
            const { data } = KnapsackG.getknapsackGlobal(req, res);
            const { player } = fightMap;
            const { art, attr } = player;
            // 更新角色
            RoleG.updataRoleGlobal(req, res, {
                life: attr.life,
                mana: attr.mana
            })
            const drug = {};
            // 找到使用过的消耗品
            art.forEach((itme) => {
                if (itme && itme.num) {
                    drug[itme.id] = {
                        num: itme.num,
                        p: itme.p
                    }
                }
            })
            if (JSON.stringify(drug) !== "{}") {
                for (let i = 0; i < KnapsackG.KNAPSACK_SIZE; i++) {
                    const { id, p } = data[i];
                    // 找到使用过的消耗品
                    if (drug[id] && p === drug[id]['p']) {
                        // 减去对应丹药
                        data[i].s -= drug[id]['num'];
                        delete drug[id];
                    }
                    // 结束循环
                    if (JSON.stringify(drug) === "{}") {
                        i = KnapsackG.KNAPSACK_SIZE;
                    }
                }
                // 更新背包
                KnapsackG.updateknapsackGlobal(req, res, { data });
            }


            //  释放战斗信息池
            // 判断是否为本次战斗中最后一个玩家,否则移除自己即可
            if (players.length === 0) {
                FightG.deleteFightInfoGlobal(req, res);
            } else {
                FightG.updataFightInfoGlobal(req, res, { players: players.filter(({ id }) => id !== role_id) });
            }
            // 释放战斗池id
            FightG.deleteFightMapGlobal(req, res);
        }
        res.send({
            code: 0,
            path: '/grand'
        })
    }
};