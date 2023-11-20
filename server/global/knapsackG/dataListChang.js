const { getDataName } = require('@table/knapsack/getDataName');
const { isEquip } = require('@table/knapsack/article');
module.exports = {
    /**
     * 设置背包信息
     * @param {*} data
     * @returns {*} data
     */
    dataListChang: function (data) {
        try {
            return JSON.parse(data).map((itme) => {
                itme.name = itme.n || getDataName(itme.id);
                if (isEquip(itme.id)) {
                    itme.s = 1;
                }
                return itme;
            })
        } catch (error) {
            console.log('背包JSON解析报错：', data)
            return [];
        }
    }
}
