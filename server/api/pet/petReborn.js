const { PetG } = require("@/global");
const { knapsackFn } = require("@/utils");
const { knapsackTable } = require("@/table");
module.exports = {
    /**
     * 宠物转生
     */
    petReborn: function (req, res) {
        const { id, flair_x, flair, reborn } = PetG.getPetGlobal(req, res) || {};
        if (!id) {
            res.send({
                code: 0,
                message: '请先将宠物参战。'
            })
            return;
        }
        if (flair_x !== flair || reborn === 3) {
            res.send({
                code: 0,
                message: '当前宠物不满足转世条件。'
            })
            return;
        }
        const article = {
            182: {
                ...knapsackTable.getArticle(182),
                s: reborn + 1
            }
        }
        const { message } = knapsackFn.deleteKnapsack(req, res, article);
        if (message) {
            res.send({
                code: 0,
                message
            })
            return;
        }
        PetG.updataPetGlobal(req, res, { reborn: reborn + 1, flair_x: flair_x + 1 });
        res.send({
            code: 0,
            success: `消耗${reborn + 1}宠物转生卷,宠物先天资质+1`,
            data: true
        })
    },
}