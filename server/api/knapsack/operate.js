const { KnapsackG, GrandG } = require('@/global');
const { knapsackFn, equipFn } = require('@/utils');
const { knapsackTable } = require('@/table');
module.exports = {
    /**
     * 物品操作
     * @param {*} type 1:使用物品,2:入库,3:出库,4:丢弃
     */
    operate: async (req, res) => {
        const { in_x, s, type } = req.body;
        const { data, tael, yuanbao } = await knapsackFn.getKnapsackInfo(req, res, { type });
        // 验证物品信息
        if (knapsackFn.chekeArticle(req, res, data)) {
            return;
        }
        const { id, name } = data[in_x];
        const isEquip = knapsackTable.isEquip(id);
        let message = '';
        let success = '';
        //  使用物品
        if (type === 1 && !isEquip) {
            const results = knapsackFn.eatArticle(req, res, id, s);
            if (results.success) {
                success = results.success;
                data[in_x]['s'] -= s;
                data[in_x]['s'] || data.splice(in_x, 1);
                KnapsackG.updateknapsackGlobal(req, res, { data });
            } else {
                message = results.message;
            }

        }
        // 佩戴装备
        if (type === 1 && isEquip) {
            const results = equipFn.wearEquip(req, res, data[in_x]);
            if (!results.message) {
                results.replaceEquip ? (data[in_x] = results.replaceEquip) : data.splice(in_x, 1);
                KnapsackG.updateknapsackGlobal(req, res, { data });
            } else {
                message = results.message;
            }
        }
        // 入库
        if (type === 2) {
            const { data: wareData } = await knapsackFn.getKnapsackInfo(req, res, { type: 3 });
            const article = { [id]: { id, name, s } };
            const { message, data: newWareData } = knapsackFn.addArticle(article, wareData);
            if (!message) {
                data[in_x]['s'] -= s;
                data[in_x]['s'] || data.splice(in_x, 1);
                KnapsackG.updateknapsackGlobal(req, res, { data });
                await knapsackFn.updateWarehouse(req, res, { data: newWareData });
            } else {
                message = '仓库已满,无法继续存入物品';
            }
        }
        // 出库
        if (type === 3) {
            const { data: knaData } = await knapsackFn.getKnapsackInfo(req, res);
            const article = { [id]: { id, name, s } }
            message = knapsackFn.addKnapsack(req, res, article, knaData);
            if (!message) {
                data[in_x]['s'] -= s;
                data[in_x]['s'] || data.splice(in_x, 1);
                await knapsackFn.updateWarehouse(req, res, { data });
            } else {
                message = '背包已满,无法继续取出物品';
            }
        }
        // 丢弃
        if (type === 4) {
            data[in_x]['s'] -= s;
            data[in_x]['s'] || data.splice(in_x, 1);
            KnapsackG.updateknapsackGlobal(req, res, { data });
            GrandG.setGrandEleGlobal(req, res, { article: [{ id, s }] });
        }
        res.send({
            code: 0,
            message,
            success,
            data: {
                list: data,
                tael: tael,
                yuanbao: yuanbao
            }
        })
    }
};
