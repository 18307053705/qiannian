const { ActivityG } = require("../../global");
module.exports = {
    /**
     * 获取世界BOSS信息
     */
    getBossInfo: function (req, res) {
        const { boss, rank, shed } = ActivityG.getWorldBoss(req, res);
        res.send({
            code: 0,
            data: {
                boss,
                rank,
                shed
            }
        })
    }
};