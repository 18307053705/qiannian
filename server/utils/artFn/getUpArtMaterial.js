const { knapsackTable } = require("../../table");
const { deleteKnapsack } = require("../knapsackFn/deleteKnapsack");
const { artLevelCompute } = require("./artLevelCompute");

module.exports = {
    /**
     * 计算技能升级材料
     * @param {*} req
     * @param {*} res
     * @param {*} art.l 等级
     * @param {*} art.r 转数
     * @returns message 升级后等级
     * @returns up_art.l 升级后等级
     * @returns up_art.r 升级后转数
     */
    getUpArtMaterial: function (req, res, art) {
        const up_art = artLevelCompute(art.l, art.r);
        if (!up_art) {
            return { message: '技能已经满级，无法继续提升。' };
        }
        const { l, r, p } = up_art;
        let materialId = undefined;
        let s = 1;
        // 领悟技能不消耗材料
        if (l === 0) {
            delete up_art.p;
            return {
                up_art
            };
        }
        // 升重消耗材料
        if (p === 'l') {
            // 低于13级使用的材料Id
            materialId = 66 + l;
            // 13级及以上使用初阶技能升级书
            if (l > 13) {
                materialId = 87;
                s = l - 13;
            }
            // 30级及以上使用中阶技能升级书
            if (l > 30) {
                materialId = 88;
                s = l - 30;
            }
            // 50级及以上使用高阶技能升级书
            if (l > 50) {
                materialId = 89;
                s = l - 50;
            }
        }
        // 升转消耗材料
        if (p === 'r') {
            materialId = 79 + r;
            s = r;
        }
        // 计算消耗材料
        const { type, n, } = knapsackTable.getArticle(materialId);
        const article = {
            [materialId]: {
                p: type,
                n,
                s
            }
        }
        const { message, success } = deleteKnapsack(req, res, { article });
        delete up_art.p;
        return {
            message,
            up_art,
            success
        };
    }
};
