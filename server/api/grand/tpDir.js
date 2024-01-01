const { grandFn } = require('@/utils');
const { ActiveQueueG } = require('@/global');

module.exports = {
    /**
     * 传送指令
     */
    tpDir: async (req, res) => {
        const { dir } = req.body;
        const { life, socialize_pool } = RoleG.getRoleGlobal(req, res);
        // 上古战场校验
        if (dir.split(',')[0] === '60003') {
            if (!ActiveQueueG.getZhanChang()) {
                res.send({
                    code: 0,
                    message: '上古战场活动还未开始,无法进入！'
                })
                return;
            }
            if (life <= 0) {
                res.send({
                    code: 0,
                    message: '生命值为空,无法进入上古战场!'
                })
                return;
            }
        }
        if (dir.split(',')[0] === '60004') {
            if (!ActiveQueueG.getCaiLingDong()) {
                res.send({
                    code: 0,
                    message: '彩灵洞活动还未开始,无法进入！'
                })
                return;
            }
            const { ranks } = socialize_pool;
            if (!ranks) {
                res.send({
                    code: 0,
                    message: '暂未拥有队伍，无法进入彩灵洞！'
                })
                return;
            }

        }
        if (dir.split(',')[0] === '60005') {
            if (!ActiveQueueG.getJinYindao()) {
                res.send({
                    code: 0,
                    message: '金银岛活动还未开始,无法进入！'
                })
                return;
            }
            const { gang } = socialize_pool;
            if (!gang) {
                res.send({
                    code: 0,
                    message: '暂未拥有帮会，无法进入金银岛！'
                })
                return;
            }
           
        }
        const address = grandFn.tpDir(req, res, dir);
        return grandFn.updataDir(req, res, { address });
    }
};