const { FightG } = require("../../global");
const { updateRoleAttr } = require('./getFightResults/updateRoleAttr');
module.exports = {
    /**
     * 放弃战斗
     * @param {*} req 
     * @param {*} res
     */
    releaseFight: function (req, res) {
        const { fightMap } = FightG.getFightGlobal(req, res);
        if (fightMap) {
            const { FIGHT_TYPE } = FightG;
            const { type, id } = fightMap;
            // 更新角色属性
            updateRoleAttr(req,res)
            // 玩家战斗
            if (type === FIGHT_TYPE.duel || type === FIGHT_TYPE.kill) {
                const tFightMap = FightG.getFightMap(id);
                // 判断对方战斗是否被释放
                if (tFightMap) {
                    if (tFightMap.state === 0) {
                        FightG.updataFightMapGlobal(req, res, { state: 1 }, role_id);
                    }
                }
            }

            // 非组队
            // if (FIGHT_TYPE.rank !== type) {
            //     FightG.deleteFightInfoGlobal(req, res);
            // }
            FightG.deleteFightMapGlobal(req, res);
        }
    }
};
