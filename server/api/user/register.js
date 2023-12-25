const { ruleFn, userFn } = require('@/utils');
const { UserSql } = require('@/mysql');
module.exports = {
    register: async function (req, res) {
        const { user, pass } = req.body;
        // 验证数据安全
        if (!ruleFn.checkLoginRule(res, user, pass)) {
            return;
        };

        const results = await UserSql.asyncGetUser(user);
        if (results[0]) {
            return res.send({
                code: 0,
                message: "账号或者该设备重复注册。"
            });
        }
        await UserSql.asyncRegisterUser(user, pass);
        res.cookie("q_uid", user);
        res.cookie("token", userFn.creatToken(user, pass));
        res.cookie("q_m", userFn.encryptionPass(pass));
        res.send({
            code: 0,
            data: "注册成功"
        });
    }
}