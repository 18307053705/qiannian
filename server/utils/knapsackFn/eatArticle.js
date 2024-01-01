
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
        const { group1, group2, group3, name } = knapsackTable.getArticle(id);
        if (group1) {
            const { message, text } = EffectTable.group1Fn(req, res, group1, s);
            if (message) {
                res.send({
                    code: 0,
                    message
                })
                return false;
            }
            return { success: `消耗${s}${name},${text}` };
        }
        if (group2) {
            const { text } = EffectTable.group2Fn(req, res, group2, s);
            return { success: `消耗${s}${name},${text}` };

        }
        if (group3) {
            const { success, active, message } = EffectTable.group3Fn(req, res, name, group3, s);
            const { data } = KnapsackG.getknapsackGlobal(req, res);
            return { success, data, active, message };

        }
        return { message: "该物品无法直接使用。" };
    }
}