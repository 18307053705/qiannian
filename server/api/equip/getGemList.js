const { knapsackTable } = require('@/table');
// 宝石id 226 - 295
module.exports = {
    /**
     * 获取宝石列表
     */
    getGemList: (req, res) => {
        const { data } = KnapsackG.getknapsackGlobal(req, res);
        const gemList = [];
        data.forEach(({ id, s, name ,uid}) => {
            if (knapsackTable.isGemstone(id)) {
                gemList.push({
                    id,
                    s,
                    name,
                    uid
                })
            }
        })
        res.send({
            code: 0,
            data: gemList
        })
    }
};
