const { GrandG, FightG } = require('@/global');
module.exports = {
    /**
     * 检验创建战斗
     * @param req 
     * @param res
     * @param iscContinue 是否刷怪
     * @returns Boolean true:可创建,false:不可创建
     */
    creatFightCheck: function (req, res, iscContinue) {
        const { FIGHT_TYPE_EUNM } = FightG;
        const { fightInfo } = FightG.getFightGlobal(req, res);
        if (fightInfo) {
            return false;
        }
        const iRole = RoleG.getRoleGlobal(req, res);
        if (iRole.life <= 0) {
            res.send({
                code: 0,
                message: '生命值为空,无法进入战斗!'
            });
            return;
        }
        // 检验是否可继续
        const { currentDir } = GrandG.getDirGlobal(req, res);
        const { num, role_id } = currentDir;
        const type = 1;
        // 玩家战斗不可刷怪操作
        if (iscContinue && (type === FIGHT_TYPE_EUNM.duel || type === FIGHT_TYPE_EUNM.kill)) {
            res.send({
                code: 0,
                message: "非法战斗"
            });
            return;
        }
        // 人机战斗校验
        if ((type === FIGHT_TYPE_EUNM.pve || type === FIGHT_TYPE_EUNM.rank) && num !== -1 && num === 0) {
            res.send({
                code: 0,
                message: "非法战斗"
            });
            return;
        }

        // 玩家战斗
        if (type === FIGHT_TYPE_EUNM.duel || type === FIGHT_TYPE_EUNM.kill) {
            // 检验对方是否处于战斗状态
            const tFightMap = FightG.getFightGlobal(req, res, role_id);
            if (tFightMap) {
                res.send({
                    code: 0,
                    message: `${role.role_name}正在战斗中!`
                });
                return;
            }

            // 校验对方是否在线
            const role = RoleG.getRoleGlobal(req, res, { role_id });
            if (!role) {
                res.send({
                    code: 0,
                    message: `${role.role_name}不在线!"`
                });
                return;
            }
            if (role.life <= 0) {
                res.send({
                    code: 0,
                    message: `${role.role_name}生命值为空,无法进入战斗!`
                });
                return;
            }
            const { address } = RoleG.getRoleGlobal(req, res);
            if (role.address !== address) {
                res.send({
                    code: 0,
                    message: `${role.role_name}不在此地!`
                });
                return;
            }
        }

        return false;

    },

};
