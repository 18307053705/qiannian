const { KNAPSACK_Global } = require('./config');
const { getRoleGlobal } = require('../roleG/getRoleGlobal');
const { getDataName } = require('../../table/knapsack/getDataName');

module.exports = {
    /**
     * 设置背包信息
     * @param {*} req 
     * @param {*} res 
     * @param {*} knapsack 背包信息
     * @returns {*} knapsack:{data:[],yuanbao,tael}| undefined
     */
    setknapsackGlobal: function (req, res, knapsack) {
        const { role_id } = getRoleGlobal(req, res);
        KNAPSACK_Global[role_id] = {
            ...knapsack,
            data: JSON.parse(knapsack['data']).map(({ id, p, ext, n2, s }) => {
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
            }),
            updateKeys: [],
            id: role_id
        };
    }
}
