const { RoleG, KnapsackG, SocializeG, PetG } = require('../../global');
const { roleFn } = require('../../utils');
module.exports = {
    /**
     * 角色登录
     */
    roleLogin: async (req, res) => {
        const user = req.cookies["q_uid"];
        const { role_id } = req.body;
        const { results: role } = await res.asyncQuery(`select * from role  where user_id="${user}" and role_id="${role_id}"`);
        const { results: knapsack } = await res.asyncQuery(`select * from knapsack  where user_id="${user}" and role_id="${role_id}"`);

        if (!role[0] && !knapsack[0]) {
            res.send({
                code: 100006,
                data: '角色信息异常'
            });
            return;
        }
        // 退出同账号下的其他角色
        await roleFn.roleExit(req, res);
        // 保存角色信息,并且记录登录时间
        RoleG.setRoleGlobal(req, res, role[0]);
        KnapsackG.setknapsackGlobal(req, res, knapsack[0]);
        SocializeG.setSocializeGlobal(req, res);
        PetG.setPetGlobal(req, res);
        // Global.setRoleGlobal(req, role[0]);
        // Global.setknapsackGlobal(req, knapsack[0]);
        // Global.setSocializeGlobal(req);
        // Global.setPetGlobal(req);
        // Global.initDailyGlobal(role_id);
        // 不存在任务池，即代表今天第一次登录,初始化任务池
        // if (!Global.taskLoop[role_id]) {
        //     taskFn.initTask(req);
        // }
        res.send({
            code: 0,
            data: '角色选择成功'
        });
    }
};