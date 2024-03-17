const { FightG } = require('@/global');
const { knapsackTable } = require('@/table');
module.exports = {
    /**
     * 获取战斗配置
     */
    getFightConfig: async (req, res) => {
        const { fightInfo } = FightG.getFightGlobal(req, res);
        const { data } = KnapsackG.getknapsackGlobal(req, res);
        const { skill_pool } = RoleG.getRoleGlobal(req, res);
        const art = [];
        const drug = data.filter(({ id }) =>  knapsackTable.isReply(id));
    
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
                config: fightInfo.player.art
            }
        });
    }
}