const { ruleFn, userFn } = require('../../utils');
const userSql = require('@/mysql/userSql');
module.exports = {
    login: async function (req, res) {
        const { user, pass } = req.body;
        // 验证数据安全
        if (!ruleFn.checkLoginRule(res, user, pass)) {
            return;
        };
        const results = await userSql.asyncGetUserInfo(user,pass);
        if (results) {
            res.cookie("q_uid", user);
            res.cookie("token", userFn.creatToken(user, pass));
            res.cookie("q_m", userFn.encryptionPass(pass));
            return res.send({
                code: 0,
                data: "登录成功"
            });
        }
        res.send({
            code: 0,
            message: "登录失败,账号或密码有误。"
        });
    }
}

