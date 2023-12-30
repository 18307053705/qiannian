const { FightG } = require('@/global');
const { computeRoleResults } = require('./computeRoleResults');
const { computeRivalResults } = require('./computeRivalResults');
const { getFreakReward } = require('./getFreakReward');
const { getDuelReward } = require('./getDuelReward');
const { FIGHT_STATE_EUNM, FIGHT_TYPE_EUNM } = FightG;
module.exports = {
    /**
     * 计算战斗结果
     * @param req 
     * @param res
     * @param Boolean true:战斗结束,false:战斗继续
     */
    computeFightResults: function (req, res) {
        const { fightInfo } = FightG.getFightGlobal(req, res);
        const { type, reward, update } = fightInfo;
        let state = fightInfo.state;
        // 战斗中-计算对手是否阵亡
        if (state === FIGHT_STATE_EUNM.inCombat) {
            state = computeRivalResults(req, res);
        }
        // 战斗中-计算玩家自身是否阵亡
        if (state === FIGHT_STATE_EUNM.inCombat) {
            state = computeRoleResults(req, res);
        }
        // 战斗胜利且未领取过奖励-领取奖励
        if (state === FIGHT_STATE_EUNM.victory && !reward) {
            if (type === FIGHT_TYPE_EUNM.pve || type === FIGHT_TYPE_EUNM.rank) {
                getFreakReward(req, res);
            }
            if (type === FIGHT_TYPE_EUNM.duel || type === FIGHT_TYPE_EUNM.kill) {
                getDuelReward(req, res);
            }
        }
        // 战斗结束-未更新角色属性且非切磋-更新角色属性
        if (state === !FIGHT_STATE_EUNM.inCombat && !update && type !== FIGHT_TYPE_EUNM.duel) {
            const player = FightG.getFightGlobal(req, res).fightInfo.player;
            RoleG.updataRoleGlobal(req, res, {
                life: player.attr.life,
                mana: player.attr.mana
            })
            FightG.updataFightInfoGlobal(req, res, { update: true });
        }
        // 返回战斗状态
        return state !== FIGHT_STATE_EUNM.inCombat;
    }

};
