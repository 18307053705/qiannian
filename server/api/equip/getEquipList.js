const { knapsackTable } = require('../../table');
module.exports = {
    /**
     * 获取装备列表
     */
    getEquipList: (req, res) => {
        const { data } = KnapsackG.getknapsackGlobal(req, res);
        const list = [];
        data.forEach((({ id, ...itme }, index) => {
            if (knapsackTable.isEquip(id)) {
                const { pos } = knapsackTable.getArticle(id);
                list.push({
                    id,
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
