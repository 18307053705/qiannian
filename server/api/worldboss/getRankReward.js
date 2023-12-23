const { ActivityG, ActiveQueueG } = require("../../global");

function getReward(index) {
    // 排名第一
    if (index === 1) {
        return {
            world: 1000,
            yuanbao: 200,
            tael: 300000,
        }
    }
    // 排名2 3
    if (index < 4) {
        return {
            world: 700,
            yuanbao: 100,
            tael: 200000,
        }
    }
    // 排名前10
    if (index < 11) {
        return {
            world: 500,
            yuanbao: 100,
            tael: 100000,
        }
    }
    return {
        world: 200,
        yuanbao: 50,
        tael: 50000,
    }
}

module.exports = {
    /**
     * 获取排名奖励
     * @param {*} req.id_x
     */
    getRankReward: function (req, res) {
        if (ActiveQueueG.getWorldBoss()) {
            res.send({
                code: 0,
                message: '请在活动结束后领取奖励'
            })
            return;
        }
        const { role_id, role_integral } = RoleG.getRoleGlobal(req, res);
        const { rank, done, boss } = ActivityG.getWorldBoss(req, res);
        if (boss.life) {
            res.send({
                code: 0,
                message: '世界BOSS未死亡，无法领取排名奖励'
            })
            return;
        }
        if (done.includes(role_id)) {
            res.send({
                code: 0,
                message: '无法重复领取排名奖励'
            })
            return;
        }
        const list = Object.values(rank).sort((pre, next) => {
            if (pre.v === next.v) {
                return pre.s - next.s;
            }
            return next.v - pre.v;
        })

        const index = list.findIndex(({ id }) => id === role_id);
        if (index === -1) {
            res.send({
                code: 0,
                message: '暂无你的排名,无法领取奖励'
            })
            return;
        }


        const data = getReward(index + 1);
        const { yuanbao, tael } = KnapsackG.getknapsackGlobal(req, res);
        role_integral.world += data.world;
        RoleG.updataRoleGlobal(req, res, { role_integral });
        KnapsackG.updateknapsackGlobal(req, res, { yuanbao: yuanbao + data.yuanbao, tael: tael + data.tael });
        // 加入已领取
        done.push(role_id);
        ActivityG.updateWorldBoss(req, res, { done });

        res.send({
            code: 0,
            data
        })
    }
};