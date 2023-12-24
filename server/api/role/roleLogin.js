const { roleFn } = require('@/utils');
const { roleSql, knapsackSql } = require('@/mysql')
module.exports = {
    /**
     * 角色登录
     */
    roleLogin: async (req, res) => {
        const user = req.cookies["q_uid"];
        const { role_id } = req.body;
        if (!user || !role_id) {
            ErrorG.paramsError(res);
            return;
        }
        const role = await roleSql.asyncGetSelfRoleInfo(req);
        const knapsack = await knapsackSql.asyncGetSelfKnapsack(req);
        if (!role && !knapsack) {
            res.send({
                code: 100006,
                data: '角色信息异常'
            });
            return;
        }
        await roleFn.roleLogin(req, res, role, knapsack);

        res.send({
            code: 0,
            data: '角色选择成功'
        });
    }
};