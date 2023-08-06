const { KnapsackG } = require('../../global');
// 宝石id 226 - 295
module.exports = {
    /**
     * 获取宝石列表
     */
    getGemList: (req, res) => {
        const { data } = KnapsackG.getknapsackGlobal(req, res);
        const gemList = [];
        data.forEach(({ id, s, p, n }, in_x) => {
            if (id > 225 && id < 296 && p !== 3) {
                gemList.push({
                    s,
                    n,
                    in_x
                })
            }
        })
        res.send({
            code: 0,
            data: gemList
        })
    }
};
