const { FightG, RoleG, KnapsackG } = require('../../global');
module.exports = {
    /**
     * 获取战斗配置
     */
    getFightConfig: async (req, res) => {
        const { fightMap } = FightG.getFightGlobal(req, res);
        const { data } = KnapsackG.getknapsackGlobal(req, res);
        const { skill_pool } = RoleG.getRoleGlobal(req, res);
        const drug = [];
        const art = [];
        data.forEach(({ n, id, p }) => {
            if (p === 1) {
                drug.push({ n, id, })
            }
        })

        if (skill_pool.art) {
            Object.keys(skill_pool.art).forEach((key) => {
                const { n, id, p, l } = skill_pool.art[key]
                if (p !== 4 && l !== -1) {
                    art.push({ n, id, })
                }
            })
        }

        res.send({
            code: 0,
            data: {
                drug,
                art,
                config: fightMap.player.art
            }
        });
    }
}