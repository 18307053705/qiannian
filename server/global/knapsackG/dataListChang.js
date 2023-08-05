const { getDataName } = require('../../table/knapsack/getDataName');

module.exports = {
    /**
     * 设置背包信息
     * @param {*} data
     * @returns {*} data
     */
    dataListChang: function (data) {
        return JSON.parse(data).map(({ id, p, ext, n2, s }) => {
            // 装备存在自定义名称
            if (n2) {
                return {
                    id,
                    p,
                    ext,
                    n: n2,
                    n2,
                    s
                }
            }
            return {
                id,
                p,
                ext,
                n: getDataName(id, p),
                s
            }
        })
    }
}
