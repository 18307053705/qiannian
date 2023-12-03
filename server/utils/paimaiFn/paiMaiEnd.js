const { addArticle } = require('../knapsackFn/addArticle');
const { getKnapsackInfo } = require('../knapsackFn/asyncGetKnapsack');
const { updateKnapsack } = require('../knapsackFn/updateKnapsack');
const { sendChat } = require('../../global/chatG/sendChat');
module.exports = {
    /**
     * 拍卖结束
     * @param {*} req 
     * @param {*} res 
     * @param {*} data 拍卖信息
     * @param {*} callback 回调
     */
    paiMaiEnd: async function (req, res, itme,callback) {
        const { info, role_id, price, role_name, offer_id } = itme;
        const article = { [info.id]: info };

        // 流拍，物品返回给玩家
        if (!offer_id) {
            const { data } = await getKnapsackInfo(req, res, { role_id });
            const { data: list } = addArticle(article, data, true);
            updateKnapsack(req, res, { data: list }, role_id);
            // // 回调函数，执行监听下个拍卖品
            // callback();
            return;
        }
        // 未流拍 拍卖方获取赢两
        const { tael } = await getKnapsackInfo(req, res, { role_id });
        // 拍出千万价格,考虑世界公共
        if (price >= 10000000) {
            sendChat(req, res, 0, `${role_name}在拍卖行的${info.name}竟然拍出了天价${price}`);
        }

        // 收取20%手续费
        updateKnapsack(req, res, { tael: tael + Math.floor(price * 0.8) }, role_id);
        // 竞拍方获得物品
        const { data } = await getKnapsackInfo(req, res, { role_id: offer_id });
        const { data: list } = addArticle(article, data, true);
        updateKnapsack(req, res, { data: list }, offer_id);
        // 回调函数，执行监听下个拍卖品
        // callback();
    }
}