const { isEquip } = require("@/table/knapsack/article/index");

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
        const { EQUIP_INIT_EXT, KNAPSACK_SIZE, KNAPSACK_LIMIT } = KnapsackG;
        const { data } = list ? { data: list } : KnapsackG.getknapsackGlobal(req, res);
        const artReward = {};
        const equipReward = {};
        const dataSize = data.length;
        const date = new Date() * 1;
        let equipNum = 0;
        Object.keys(article).forEach((id, index) => {
            const { name, n, ext = EQUIP_INIT_EXT, s = 1 } = article[id];
            if (isEquip(id)) {
                equipNum++;
                equipReward[id] = {
                    name,
                    n,
                    id: Number(id),
                    s,
                    ext,
                    uid: `${date}${index}`
                }
            } else {
                artReward[id] = {
                    id: Number(id),
                    name,
                    s,
                    uid: `${date}${index}`
                }
            }
        })
        if (dataSize + equipNum >= KNAPSACK_SIZE && !force) {
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
                    if (s + num <= KNAPSACK_LIMIT) {
                        data[index]['s'] += num;
                        delete artReward[id];
                    } else {
                        artReward[id]['num2'] = data[index]['s'] + num - KNAPSACK_LIMIT;
                        data[index]['s'] = KNAPSACK_LIMIT;
                    }
                }
                // 全部处理完,结束循环
                if (JSON.stringify(artReward) === '{}') {
                    index = dataSize;
                }
            }
            //  遍历结束还存在物品奖励，说明物品为新增
            Object.keys(artReward).forEach(key => {
                const { s, num2, ...itme } = artReward[key];
                data.push({ ...itme, s: num2 || s });
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
        if (data.length > KNAPSACK_SIZE) {
            return '背包已满,请注意清理背包'
        }
    },

}