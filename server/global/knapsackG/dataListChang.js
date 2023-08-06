const { getDataName } = require('../../table/knapsack/getDataName');

module.exports = {
    /**
     * 设置背包信息
     * @param {*} data
     * @returns {*} data
     */
    dataListChang: function (data) {
        return JSON.parse(data).map(({ id, p, ext, n2, s }) => {
            const itme = {
                id,
                p,
                s,
                ext
            }
            // 装备存在自定义名称
            if (n2) {
                itme.n = n2;
                itme.n2 = n2;
            } else {
                itme.n = getDataName(id, p);
            }
            return itme;
        })
    }
}
