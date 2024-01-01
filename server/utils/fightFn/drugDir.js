const { FightG } = require("@/global");
const { knapsackTable } = require("@/table");
const deleteKnapsack = require("../knapsackFn/deleteKnapsack");

module.exports = {
    /**
     * 使用物品
     * @param {*} req 
     * @param {*} res 
     * @param {*} drugId 物品id
     */
    drugDir: function (req, res, drugId) {
        const { fightInfo } = FightG.getFightGlobal(req, res);
        const { data } = KnapsackG.getknapsackGlobal(req, res);
        // 查找目标物品
        const drugItme = data.find(({ id }) => id == drugId)
        const { roundText, player, roundAttr } = fightInfo;
        let success = false;
        let drugInfo = undefined;
        const newArt = player.art.map((itme) => {
            if (itme.p === 2 && itme.id === drugId) {
                if (drugInfo) {
                    return drugInfo;
                }
                itme.s = drugItme.s - 1;
                success = true;
                drugInfo = itme;
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
            const { message } = deleteKnapsack.deleteKnapsack(req, res, article);
            // 消耗品不存在
            if (message) {
                return message;
            }
            // 物品对应效果
            const { group1 } = drug;
            const [key, value] = group1.split('-');
            const { role } = roundAttr;
            role[key] += Number(value);
            roundText[`restore_${key}`] = Number(value);
            if (role[key] > role[`${key}_max`]) {
                role[key] = role[`${key}_max`]
            }
            player.art = newArt;
            FightG.updataFightInfoGlobal(req, res, {
                player,
                roundText,
                roundAttr
            })
            const { skill_pool } = RoleG.getRoleGlobal(req, res);
            RoleG.updataRoleGlobal(req, res, { skill_pool: { ...skill_pool, fight: newArt } });
        }
    },

};
