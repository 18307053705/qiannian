const { RoleG, KnapsackG, GrandG, PetG, TaskG } = require("../../global");
const { releaseFight } = require("../../utils/fightFn/releaseFight");

const { TASK_TYPE_MEUN } = TaskG;

function tasksUpdata(tasks) {
    return Object.values(tasks).map(({ complete = {}, id, taskType, status }) => {
        const task = {
            id,
            p: taskType,
            s: status
        };
        const { freak } = complete;
        const values = Object.values(freak || {});
        if (values.length) {
            task['f'] = {};
            values.forEach(({ id, c }) => {
                if (c) {
                    task['f'][id] = c;
                }

            })
        }
        return task;
    })

}

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
        const roleInfo = RoleG.getRoleGlobal(req, res);
        if (roleInfo) {
            const main = TaskG.getTaskGlobal(req, res, TASK_TYPE_MEUN.main);
            const chance = TaskG.getTaskGlobal(req, res, TASK_TYPE_MEUN.chance);
            const copy = TaskG.getTaskGlobal(req, res, TASK_TYPE_MEUN.copy);
            RoleG.updataRoleGlobal(req, res, { task_pool: [...tasksUpdata(main), ...tasksUpdata(chance), ...tasksUpdata(copy)] });
            const { role_id, socialize_pool } = roleInfo;
            // 释放全局地图缓存
            GrandG.deleteDirGlobal(req, res);
            // 释放全局战斗缓存
            releaseFight(req, res);
            // 保存角色信息
            RoleG.saveRoleSql(req, res, user);
            // 保存背包信息
            KnapsackG.saveknapsackSql(req, res, role_id);
            // 释放全局背包缓存
            KnapsackG.deleteknapsackGlobal(req, res, role_id);
            // 释放全局宠物信息
            PetG.savePetSql(req, res);
            // 释放全局角色缓存,必须最后释放,其余缓存皆是基于role_id
            RoleG.deleteRoleGlobal(req, res, user);
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
