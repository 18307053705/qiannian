const { ActivityG, RoleG } = require("../../global");
module.exports = {
    /**
     * 获取排名信息
     */
    getRankInfo: function (req, res) {
        const { role_id } = RoleG.getRoleGlobal(req, res);
        const { rank, ids } = ActivityG.getJinYinDao(req, res);
        res.send({
            code: 0,
            data: {
                ids,
                rank,
                role_id,
            }
        })
    }
};