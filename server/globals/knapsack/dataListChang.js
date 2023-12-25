const { getDataName } = require('@/table/knapsack/getDataName');
const { isEquip } = require('@/table/knapsack/article');
const { EQUIP_INIT_EXT } = require('./config');
module.exports = {
    /**
     * 设置背包信息
     * @param {*} data
     * @returns {*} data
     */
    dataListChang: function (data, uidFromt) {
        const date = new Date() * 1;
        return data.map((itme, index) => {
            itme.name = itme.n || getDataName(itme.id);
            if (isEquip(itme.id)) {
                itme.s = 1;
                itme.ext = itme.ext || EQUIP_INIT_EXT;
            }
            itme.uid = `${uidFromt ? itme.id : date}${index}`;
            return itme;
        })
    }
}
