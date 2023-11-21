const { KnapsackG } = require("@global");
const { knapsackTable } = require("@table");

module.exports = {
    /**
     * 增加物品
     * @param {*} req 
     * @param {*} res 
     * @param {*} data.article 必传({id:{s,name}})
     * @param {*} data.data 可选
     * @param {*} data.force 强制添加
     * @returns {string}  message | undefined
     */
    addKnapsack: function (req, res, article, { data: list, force } = {}) {
        if (!article || JSON.stringify(article) === '{}') {
            return undefined;
        }
        const { data } = list ? { data: list } : KnapsackG.getknapsackGlobal(req, res);
        const artReward = {};
        const equipReward = {};
        const dataSize = data.length;
        let equipNum = 0;
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
        if (dataSize + equipNum >= KnapsackG.KNAPSACK_SIZE && !force) {
            return '背包已满,请先清理背包'
        }
        // 物品奖励
        if (JSON.stringify(artReward) !== '{}') {
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
        // 新增装备
        if (JSON.stringify(equipReward) !== '{}') {
            Object.keys(equipReward).forEach(key => {
                data.push(equipReward[key]);
                delete equipReward[key];
            })
        }

        KnapsackG.updateknapsackGlobal(req, res, { data });
        if (data.length > KnapsackG.KNAPSACK_SIZE) {
            return '背包已满,请注意清理背包'
        }
    },

}