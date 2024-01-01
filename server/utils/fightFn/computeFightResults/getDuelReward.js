const { DailysG, FightG, ActiveQueueG } = require('@/global');
module.exports = {
    /**
     * 获取切磋奖励
     * @param  req 
     * @param  res
     */
    getDuelReward: function (req, res) {
        const { address, role_integral, role_id } = RoleG.getRoleGlobal(req, res);
        // 获取战斗是否开启
        const isActive = ActiveQueueG.getZhanChang();
        // 战场活动时间
        if (address.split(',')[0] === '60003' && isActive) {
            const { fightInfo } = FightG.getFightGlobal(req, res, role_id);
            const { template } = fightInfo;
            let success = `战胜${template.name},战场积分+1,`;
            const { zhanChang } = DailysG.getDailysGlobal(req, res);
            const { zhanChang: tZhanChang } = DailysG.getDailysGlobal(req, res, { roleId: template.role_id });
            if (zhanChang.v < 2000) {
                zhanChang.v += 50;
                // 增加50功勋
                role_integral.exploit += 50;
                RoleG.updataRoleGlobal(req, res, { role_integral });
                success += '功勋+50。'
            } else {
                success += '每日功勋已达上限。'
            }
            res.customSuccess = success;
            // 战场击杀+2
            zhanChang.j += 2;
            zhanChang.d = new Date() * 1;
            // 对方死亡+1
            tZhanChang.s += 1;
            DailysG.updataDailysGlobal(req, res, { zhanChang });
            DailysG.updataDailysGlobal(req, res, { zhanChang: tZhanChang }, template.role_id);
            FightG.updataFightInfoGlobal(req, res, { reward: true }, role_id);
            if (tZhanChang.s >= 10) {
                // 非切切磋死亡，位置移动至云荒大陆
                RoleG.updataRoleGlobal(req, res, { address: '40000,0,0' }, { role_id: template.role_id });
            }
        }
    },

};
