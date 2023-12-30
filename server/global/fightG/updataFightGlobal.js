const { FIGHT_INFO_Global, FIGHT_RANK_INFO_Global } = require("./config");


module.exports = {
    /**
     * 更新战斗信息池
     * @param req 
     * @param res 
     * @param fightInfo.id 战斗池信息Id|玩家对战则是对方role_id
     * @param fightInfo.state 战斗状态(0:战斗中,1:胜利,2:失败)
     * @param fightInfo.type 战斗类型战斗类型(1:玩家VS人机,2:多玩家VS人机家,3:切磋,4:击杀)
     * @param fightInfo.template 敌人模版{id:(role_id,怪物id),num:对方数量}
     * @param fightInfo.results 战斗结果(奖励信息)
     * @param fightInfo.player 我的信息
     * @param fightInfo.fightAttr 战斗属性{role:自身,rival:对方属性,pet:宠物属性}
     * @param fightInfo.intervalTime 出招时间,玩家pk使用
     */
    updataFightInfoGlobal: function (req, res, data, role_id) {
        const role = role_id ? { role_id } : RoleG.getRoleGlobal(req, res);
        FIGHT_INFO_Global[role.role_id] = JSON.parse(JSON.stringify({
            ...FIGHT_INFO_Global[role.role_id],
            ...data
        }));
    },
    /**
     * 更新组队战斗信息池
     * @param {*} req 
     * @param {*} res 
     * @param {*} data 更新数据
     */
    updataFightRankInfoGlobal: function (req, res, data) {
        const { role_id } = RoleG.getRoleGlobal(req, res);
        const { id } = FIGHT_INFO_Global[role_id];
        FIGHT_RANK_INFO_Global[id] = JSON.parse(JSON.stringify({
            ...FIGHT_RANK_INFO_Global[id],
            ...data
        }));
    },

}