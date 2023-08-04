const { FightG, RoleG } = require("../../global");
const { knapsackTable } = require("../../table");
const deleteKnapsack = require("../knapsackFn/deleteKnapsack");



module.exports = {
    /**
     * 使用物品
     * @param {*} req 
     * @param {*} res 
     * @param {*} drugId 物品id
     */
    drugDir: function (req, res, drugId) {
        const { fightMap } = FightG.getFightGlobal(req, res);
        const { art, attr } = fightMap.player;
        let success = false;
        const newArt = art.map((itme) => {
            if (itme.p === 2 && itme.id === drugId) {
                itme.s -= 1;
                success = true;
            }
            return itme;
        })
        const drug = knapsackTable.getArticle(drugId);
        // 战斗指令中存在该物品
        if (success && drug) {
            const article = {
                [drugId]: {
                    ...drug,
                    s: 1
                }
            }
            const { message } = deleteKnapsack.deleteKnapsack(req, res, { article });
            // 消耗品不存在
            if (message) {
                return message;
            }
            // 物品对应效果
            const { group1 } = drug;
            const [key, value] = group1.split('-');
            attr[key] += value;
            if (attr[key] > attr[`${key}_max`]) {
                attr[key] = attr[`${key}_max`]
            }
            FightG.updataFightMapGlobal(req, res, {
                player: {
                    ...fightMap.player,
                    art: newArt
                }
            })
            const { skill_pool } = RoleG.getRoleGlobal(req, res);
            RoleG.updataRoleGlobal(req, res, { skill_pool: { ...skill_pool, fight: newArt } });
        }
    },

};
