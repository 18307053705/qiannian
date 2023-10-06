const { ActivityG } = require("../../global");
module.exports = {
    /**
     * 获取世界BOSS信息
     */
    getBossInfo: function (req, res) {
        res.send({
            code: 0,
            data: {
                info: ActivityG.getWorldBoss(req, res)
            }
        })
    }
};