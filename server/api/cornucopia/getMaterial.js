const { knapsackTable } = require('@/table');
module.exports = {
    /**
     * 获取元素材料列表
     * @param {*} req 
     * @param {*} res 
     */
    getMaterial: function (req, res) {
        const { data } = KnapsackG.getknapsackGlobal(req, res);
        const materialAll = knapsackTable.geAllTreasureMap();
        const materialMap = {
            1: [],
            2: [],
            3: [],
            4: [],
            5: [],
        };
        data.forEach(({ id, s }) => {
            const materia = materialAll[id]
            if (materia) {
                materialMap[materia['ele']].push({
                    id,
                    name: materia.name,
                    value: materia.value,
                    s
                })
            }
        })
        res.send({
            code: 0,
            data: materialMap
        })
    }
}