const MATERIAL_MEUN = {
    1: [140, 141, 142, 143, 144, 145, 146],
    2: [147],
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
            data.forEach(({ id, s }) => {
                if (materialIdList.includes(id)) {
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