const { knapsackTable } = require('@/table');
const { deleteKnapsack } = require('../knapsackFn/deleteKnapsack');

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
    getUpArtMaterial: function (req, res, up_art, isPet) {
        const { l, r, p } = up_art;
        let materialId = undefined;
        let s = 1;
        // 角色领悟技能不消耗材料
        if (l === 1 && !isPet) {
            return {
                up_art
            };
        }
        // 升重消耗材料
        if (p === 'l') {
            // 低于13级使用的材料Id
            materialId = 1808 + l;
            // 13级及以上使用初阶技能升级书
            if (l > 13) {
                materialId = 1830;
                s = l - 13;
            }
            // 30级及以上使用中阶技能升级书
            if (l > 30) {
                materialId = 1831;
                s = l - 30;
            }
            // 50级及以上使用高阶技能升级书
            if (l > 50) {
                materialId = 1832;
                s = l - 50;
            }
        }
        // 升转消耗材料
        if (p === 'r') {
            materialId = 1822 + r;
            s = r;
        }

        if (l === 1) {
            materialId = 180
        }

        // 计算消耗材料
        const { name } = knapsackTable.getArticle(materialId);
        const article = {
            [materialId]: {
                id: materialId,
                name,
                s
            }
        }
        const { message, success } = deleteKnapsack(req, res, article);
        return {
            message,
            success
        };
    }
};
