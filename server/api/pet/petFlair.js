const { PetG } = require("@/global");
const { knapsackFn } = require("@/utils");
const { knapsackTable } = require("@/table");
module.exports = {
    /**
     * 宠物资质提升
     */
    petFlair: function (req, res) {
        const { id, flair_x, flair } = PetG.getPetGlobal(req, res) || {};
        if (!id) {
            res.send({
                code: 0,
                message: '请先将宠物参战。'
            })
            return;
        }
        if (flair_x === flair) {
            res.send({
                code: 0,
                message: '当前宠物资质已满,无法继续提升。'
            })
            return;
        }
        const article = {
            181: {
                ...knapsackTable.getArticle(181),
                s: flair + 1
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
        PetG.updataPetGlobal(req, res, { flair: flair + 1 });
        res.send({
            code: 0,
            success: `消耗${flair + 1}宠物进化卷,宠物资质+1`,
            data: {
                flair: flair + 1
            },

        })
    },
}