const { FightG } = require("../../global");
const { updateRoleAttr } = require("./getFightResults/updateRoleAttr");
module.exports = {
    /**
     * 逃跑
     * @param req 
     * @param res 
     * @returns true 逃跑成功
     */
    escapeFight: function (req, res) {
        const { FIGHT_TYPE } = FightG;
        const { fightMap } = FightG.getFightGlobal(req, res);
        const { type, id: role_id, player  } = fightMap;
        // 非死斗逃跑概率100%,死斗逃跑概率1/4
        const isEscape = FIGHT_TYPE.kill !== type || Math.floor(Math.random() * 4) === 0;
        // 判断是否逃跑成功
        if (isEscape) {
            // 玩家战斗，更新对方信息
            if (type === FIGHT_TYPE.duel || type === FIGHT_TYPE.kill) {
                FightG.updataFightMapGlobal(req, res, { state: 3, escape: `${player.name}见势不对,脚底抹油直接跑了!` }, role_id);
            }
            // 更新角色属性
            updateRoleAttr(req,res);
            FightG.deleteFightMapGlobal(req, res);
            res.send({
                code: 0,
                path: '/grand',
                success: '逃跑成功！'
            });
        }
        return isEscape;
    }

};
