const { KnapsackG, PetG, SocializeG, DailysG, ShenYuanG } = require("../../global");
const { roleExit } = require("./roleExit");
const { initTask } = require("../taskFn/initTask");
module.exports = {
    /**
     * 角色登录
     * @param {*} req 
     * @param {*} res
     * @param {*} role 角色信息
     * @param {*} knapsack 背包信息
     * 
     */
    roleLogin: async function (req, res, role, knapsack) {
        // 退出同账号下的其他角色
        await roleExit(req, res);
        // 保存角色信息,并且记录登录时间
        RoleG.setRoleGlobal(req, res, role);
        // 全局背包
        KnapsackG.setknapsackGlobal(req, res, knapsack);
        // 全局势力
        SocializeG.setSocializeGlobal(req, res);
        // 全局宠物
        PetG.setPetGlobal(req, res);
        // 全局日常
        DailysG.initDailysGlobal(req, res);
        // 全局深渊
        ShenYuanG.setShenYuan(req, res);
        //  初始化任务
        initTask(req, res)
    },
};
