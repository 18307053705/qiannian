const { EQUIP_INIT_EXT } = require('./config');
const { isEquip } = require('@/table/knapsack/article');

module.exports = {
    /**
     * 保存前背包数据处理
     * @param {*} data 
     * @returns data
     */
    saveSqlChang: function (data) {
        return JSON.parse(JSON.stringify(data)).map((itme) => {
            delete itme.name;
            delete itme.uid;
            if (isEquip(itme.id)) {
                delete itme.s;
            }
            if (itme.ext === EQUIP_INIT_EXT) {
                delete itme.ext;
            }
            return itme
        })
    }
}
