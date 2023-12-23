const { knapsackTable } = require('@/table');
module.exports = {
    /**
     * 获取元素材料列表
     * @param {*} req 
     * @param {*} res 
     */
    getMaterial: function (req, res) {
        const { data } = KnapsackG.getknapsackGlobal(req, res);
        res.send({
            code: 0,
            data: {
                material:knapsackTable.geAllTreasureMap(),
                list: data
            }
        })
    }
}