const { getDataName } = require('@/table/knapsack/getDataName');
const { isEquip } = require('@/table/knapsack/article');
const { KnapsackG } = require('@/global');
module.exports = {
    /**
     * 设置背包信息
     * @param {*} data
     * @returns {*} data
     */
    dataListChang: function (data) {
        try {
            const date = new Date() * 1;
            return JSON.parse(data).map((itme) => {
                itme.name = itme.n || getDataName(itme.id);
                if (isEquip(itme.id)) {
                    itme.s = 1;
                    itme.ext = itme.ext || KnapsackG.EQUIP_INIT_EXT;
                }
                return itme;
            })
        } catch (error) {
            console.log('店铺JSON解析报错：', data)
            return [];
        }
    }
}
