const { knapsackTable } = require('@/table');

function getMaterial(material) {
    const obj = {};
    material.split(',').forEach(itme => {
        const [id, s = 1] = itme.split('-');
        const name = knapsackTable.getDataName(id);       
        obj[id] = { name, s }
    })
    return obj;
}

module.exports = {
    /**
     * 获取合成图鉴
     */
    getHandbook: function (req, res) {
        const data = knapsackTable.getSynthesisList().map((itme) => {
            itme.materialInfo = getMaterial(itme.material);
            return itme;
        });

        res.send({
            code: 0,
            data
        })
    }
}
