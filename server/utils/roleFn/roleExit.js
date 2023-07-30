const Global = require("../../global");
const { ROLE_Global } = require("../../global/roleG");
module.exports = {
    /**
     * 退出角色
     * @param {*} req 
     * @param {*} res
     * @param {*} userid 可选参数,需要退出的角色账号
     * 
     */
    roleExit: async function (req, res, userid) {
        const user = userid || req.cookies["q_uid"];
        const roleInfo = ROLE_Global[user];
        if (roleInfo) {
            const { role_id, socialize_pool } = roleInfo;
            // //释放地图
            // delete Global.dir[role_id];
            // // 判断是否存战斗,存在则释放
            // const fightId = Global.fightRoleId[role_id];
            // if (fightId) {
            //     await fightFn.releaseFight(req, res, fightId);
            // }
            // await Global.saveRole(user);
            // await Global.saveknapsack(role_id);
            // await Global.savePet(role_id);
            // //释放角色池
            // delete Global.roleGlobal[user];
            // //释放背包池
            // delete Global.knapsackGlobal[role_id];
            // // 减少对应势力在线人员
            // Global.releaseSocializeGlobal(role_id, socialize_pool);
            return true;
        }
        return false;
    },
};
