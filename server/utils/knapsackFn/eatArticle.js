
const { knapsackTable, EffectTable } = require('../../table');
module.exports = {
    /**
     * 使用物品
     * @param {*} req 
     * @param {*} res 
     * @param {*} id 物品id 
     * @param {*} id 使用数量
     * @returns {string}  message 失败信息
     * @returns {string}  success 成功信息
     */
    eatArticle: function (req, res, id, s) {
        const { group1, group2, n } = knapsackTable.getArticle(id);
        if (group1) {
            const { message, text } = EffectTable.group1Fn(req, res, group1, s);
            if (message) {
                res.send({
                    code: 0,
                    message
                })
                return false;
            }
            return { success: `消耗${s}${n},${text}` };
        }
        if (group2) {
            EffectTable.group2Fn(req, res, group2, s);
            return { success: `消耗${s}${n}` };

        }
        return { message: "该物品无法直接使用。" };
    }
}