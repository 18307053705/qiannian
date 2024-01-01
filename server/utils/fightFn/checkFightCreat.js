const { GrandG, FightG } = require('@/global');
const { FIGHT_TYPE_EUNM, FIGHT_STATE_EUNM } = FightG;
module.exports = {
    /**
     * 检验创建战斗
     * @param req 
     * @param res
     * @param iscContinue 是否刷怪
     * @returns check true:可创建,false:不可创建
     * @returns message 错误信息
     */
    checkFightCreat: function (req, res, iscContinue) {
        const { fightInfo } = FightG.getFightGlobal(req, res) || {};
        const { currentDir } = GrandG.getDirGlobal(req, res);
        const { rank, role_id, type, num } = currentDir;
        // 校验玩家信息
        const iRole = RoleG.getRoleGlobal(req, res);
        if (iRole.life <= 0) {
            return {
                message: '生命值为空,无法进入战斗!',
                check: false
            };
        }
        // 计算战斗类型
        const fightType = role_id ? type : (rank ? FIGHT_TYPE_EUNM.rank : FIGHT_TYPE_EUNM.pve);
        // 人机校验
        if (fightType === FIGHT_TYPE_EUNM.pve || fightType === FIGHT_TYPE_EUNM.rank) {
            // 刷怪：非战斗中，且目标可被击杀
            if (iscContinue && fightInfo?.state !== FIGHT_STATE_EUNM.inCombat && num !== -1 && num === 0) {
                return { check: false, message: "非法战斗" }
            }
            return { check: true }
        }

        // 玩家战斗检验

        // 玩家战斗无法刷怪
        if (iscContinue) {
            return { check: false, message: "非法战斗" }
        }

       
        return { check: true }

    },

};
