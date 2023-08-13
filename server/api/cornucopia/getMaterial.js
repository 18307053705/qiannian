const { KnapsackG } = require('../../global');
const { cornuconpiaFn } = require('../../utils');
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
                material:cornuconpiaFn.getMaterialMeun(),
                list: data
            }
        })
    }
}