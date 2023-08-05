const { KnapsackG } = require('../../global');
const { knapsackTable } = require('../../table');
module.exports = {
    /**
     * 卸下装备
     */
    unloadEquip: (req, res) => {
        const { data } = KnapsackG.getknapsackGlobal(req, res);
        const list = [];
        data.forEach(((itme, index) => {
            if (itme.p === 3) {
                const { pos } = knapsackTable.getEquip(itme.id)
                list.push({
                    ...itme,
                    in_x: index,
                    pos
                })
            }
        }))
        res.send({
            code: 0,
            data: list
        })
    }
};
