const fightFn = require("./fightFn");
const Global = require("../global");
module.exports = {
    // 角色退出，释放全局空间
    roleExit: function (req, res, userid) {
        return new Promise(async (resolve) => {
            const user = userid || req.cookies["q_uid"];
            const roleLoop = Global.roleLoop[user];
            if (roleLoop) {
                const role = roleLoop;
                //释放角色池
                delete Global.roleLoop[user];
                //释放地图
                delete Global.grandDir.dir[`${user}_${role.id}`];
                // 判断是否存战斗,存在则释放
                const fightId = Global.fightLoop.fightRoleId[role.id];
                if (fightId) {
                    await fightFn.releaseFight(req, res, fightId);
                }
            }
            resolve(false);
        })
    },
}