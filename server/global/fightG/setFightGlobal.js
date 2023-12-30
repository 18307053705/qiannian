const { FIGHT_INFO_Global, FIGHT_RANK_INFO_Global } = require("./config");
module.exports = {
    /**
     * 设置全局战斗信息池
     * @param {*} req 
     * @param {*} res 
     * @param {*} fightInfo.type 战斗类型(1:玩家VS人机,2:多玩家VS人机家,3:切磋,4:击杀)
     * @param {*} fightInfo.rivalMold 敌人原型信息
     * @param {*} fightInfo.num 敌人数量
     * @param {*} fightInfo.isContinue 是否可继续战斗
     * @param {*} fightInfo.player 我的信息
     * @param {*} role_id 角色id,玩家之间的战斗使用
     */
    setFightGlobal: function (req, res, fightInfo, role_id) {
        const role = role_id ? { role_id } : RoleG.getRoleGlobal(req, res);
        FIGHT_INFO_Global[role.role_id] = JSON.parse(JSON.stringify(fightInfo));
    },
    // 设置组队战斗信息
    setFightRankGlobal: function (fightID, fightRankInfo) {
        FIGHT_RANK_INFO_Global[fightID] = JSON.parse(JSON.stringify(fightRankInfo));
    }

}