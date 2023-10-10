const { ActivityG, RoleG } = require("../../global");
module.exports = {
    /**
     * 获取排名信息
     */
    getRankInfo: function (req, res) {
        const { socialize_pool } = RoleG.getRoleGlobal(req, res);
        const { rank, ids } = ActivityG.getCaiLingDong(req, res);
        const { id } = socialize_pool.ranks || { id: '' }
        res.send({
            code: 0,
            data: {
                rank,
                rankId: id,
                ids
            }
        })
    }
};