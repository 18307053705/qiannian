const { FightG, GrandG } = require("../../../global");

module.exports = {
    /**
     * 获取战斗类型
     * @param req
     * @param res
     * @returns type 战斗类型
     */
    getFightType: function (req, res) {
        const { FIGHT_TYPE } = FightG;
        const { currentDir } = GrandG.getDirGlobal(req, res);
        const { rank, role_id, type } = currentDir;
        if (role_id) {
            return type;
        }
        return rank ? FIGHT_TYPE.rank : FIGHT_TYPE.pve;
    },
};
