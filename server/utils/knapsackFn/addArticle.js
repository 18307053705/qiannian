const { KnapsackG } = require("@global");
const { knapsackTable } = require("@table");
module.exports = {
    /**
     * 增加物品,不会更新背包
     * @param {*} article 必传
     * @param {*} data 必传
     * @param {*} force 强制添加,可选
     * @returns message 错误信息
     * @returns data 增加物品后的信息
     */
    addArticle: function (article, list) {
        if (!article) {
            return undefined
        }
        const artReward = {};
        const equipReward = {};
        let equipNum = 0;
        const data = JSON.parse(JSON.stringify(list))
        Object.keys(article).forEach((id) => {
            const { name, n, ext = '0_0_0_0_0_0_0_0_0', s = 1 } = article[id];
            if (knapsackTable.isEquip(id)) {
                equipNum++;
                equipReward[id] = {
                    name,
                    n,
                    id,
                    s,
                    ext
                }
            } else {
                artReward[id] = {
                    id,
                    name,
                    s,
                }
            }
        })
        const dataSize = data.length + equipNum;
        if (dataSize === KnapsackG.KNAPSACK_SIZE) {
            return {
                message: '背包已满,请先清理背包'
            }
        }
        // 物品奖励
        if (artReward) {
            for (let index = 0; index < dataSize; index++) {
                const { id, s } = data[index];
                // 判断物品id与物品类型是否相同
                if (artReward[id]) {
                    const { s: num = 1 } = artReward[id];
                    // 找到对应id,判断是否可以继续叠加
                    if (s + num <= KnapsackG.KNAPSACK_LIMIT) {
                        data[index]['s'] += num;
                        delete artReward[id];
                    } else {
                        artReward[id]['num2'] = data[index]['s'] + num - KnapsackG.KNAPSACK_LIMIT;
                        data[index]['s'] = KnapsackG.KNAPSACK_LIMIT;
                    }
                }
                // 全部处理完,结束循环
                if (JSON.stringify(artReward) === '{}') {
                    index = dataSize;
                }
            }
            //  遍历结束还存在物品奖励，说明物品为新增
            Object.keys(artReward).forEach(key => {
                const { id, name, s, num2 } = artReward[key];
                data.push({ id, name, s: num2 || s });
                delete artReward[key];
            })
        }
        // 装备奖励
        if (equipReward) {
            Object.keys(equipReward).forEach(key => {
                data.push(equipReward[key]);
                delete equipReward[key];
            })
        }
        if (data.length > KnapsackG.KNAPSACK_SIZE) {
            return { message: '背包已满,请先清理背包' }
        }
        return {
            data
        }
    },

}