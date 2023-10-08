const { ActivityG, RoleG, KnapsackG } = require("../../global");

module.exports = {
    /**
     * 获取排名奖励
     * @param {*} req.id_x
     */
    getRankReward: function (req, res) {
        const { role_id, role_integral, role_lx } = RoleG.getRoleGlobal(req, res);
        const { ids, done } = ActivityG.getCaiLingDong(req, res);
        if (done.includes(role_id)) {
            res.send({
                code: 0,
                message: '无法重复领取排名奖励'
            })
            return;
        }
        const level = ids[role_id];
        if (!level) {
            res.send({
                code: 0,
                message: '你所在队伍的排名未进前三,无法领取奖励'
            })
            return;
        };

        let data = {
            world: 1000,
            yuanbao: 200,
            tael: 500000,
            lingXue: 100000,
        }
        if (level !== 1) {
            data = {
                world: 500,
                yuanbao: 100,
                tael: 300000,
                lingXue: 50000,
            }
        }

        const { yuanbao, tael } = KnapsackG.getknapsackGlobal(req, res);
        role_integral.world += data.world;
        RoleG.updataRoleGlobal(req, res, { role_integral, role_lx: role_lx + data.lingXue });
        KnapsackG.updateknapsackGlobal(req, res, { yuanbao: yuanbao + data.yuanbao, tael: tael + data.tael });
        // 加入已领取
        done.push(role_id);
        ActivityG.updateCaiLingDong(req, res, { done });
        res.send({
            code: 0,
            data
        })
    }
};