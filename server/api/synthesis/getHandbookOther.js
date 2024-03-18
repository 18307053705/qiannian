const { knapsackTable } = require('@/table');

module.exports = {
    /**
     * 获取其他合成图鉴
     */
    getHandbookOther: function (req, res) {
        const data = [];
        knapsackTable.getAllEquipMaterial().forEach(({ name, id, manufacture,tips }) => {
            if (manufacture) {
                data.push({
                    name,
                    id,
                    tips,
                    manufacture: {
                        s: manufacture.s,
                        name: knapsackTable.getDataName(manufacture.id)
                    }
                })
            }
        });

        res.send({
            code: 0,
            data
        })
    }
}
