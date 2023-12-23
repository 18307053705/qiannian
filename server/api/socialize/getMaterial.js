const MATERIAL_MEUN = {
    1: [53, 54, 55, 56, 57, 58, 59]
}
module.exports = {
    /**
     * 获取捐赠材料
     * @param {*} req.type 势力类型(1:帮会,2:结义,3:队伍)
     */
    getMaterial: async function (req, res) {
        const { type } = req.body;
        if (!type) {
            ErrorG.paramsError(res);
            return;
        }
        const materialIdList = MATERIAL_MEUN[type] || [];
        const { data } = KnapsackG.getknapsackGlobal(req, res);
        if (type === 1) {
            const material = {};
            data.forEach(({ id, p, s }) => {
                if (materialIdList.includes(id) && p === 5) {
                    material[id] = s;
                }
            })
            res.send({
                code: 0,
                data: material
            })
        }
    }
}