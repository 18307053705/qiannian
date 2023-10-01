const { ruleFn, userFn, osFn } = require('../../utils');
module.exports = {
    register: async function (req, res) {
        const { user, pass } = req.body;
        // 验证数据安全
        if (!ruleFn.checkLoginRule(res, user, pass)) {
            return;
        };
        const queryString = `select * from user  where user="${user}"`;
        const { results } = await res.asyncQuery(queryString);
        if (results[0]) {
            return res.send({
                code: 0,
                message: "账号或者该设备重复注册。"
            });
        }
        // 注册账号
        const sqlAdd = "insert into user(user,pass,address) values(?,?,?)";
        const addDates = [user, pass, osFn.getMacAdress()];
        await res.asyncAdd(sqlAdd, addDates)
        res.cookie("q_uid", user);
        res.cookie("token", userFn.creatToken(user, pass));
        res.cookie("q_m", userFn.encryptionPass(pass));
        res.send({
            code: 0,
            data: "注册成功"
        });
    }
}