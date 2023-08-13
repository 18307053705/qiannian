module.exports = {
    /**
     * 验证账号与密码是否合格
     * @param {*} res 
     * @param {*} user 账号 
     * @param {*} pass 密码
     * @returns false不合格
     */
    checkLoginRule: function (res, user, pass) {
        const reg = /^[A-Za-z0-9]{9,12}$/;
        if (!reg.test(user)) {
            res.send({
                code: 0,
                message: "账号需要9-12位数字或字母组成"
            });
            return false;
        }
        if (!reg.test(pass)) {
            res.send({
                code: 0,
                message: "密码需要9-12位数字或字母组成"
            });
            return false;
        }
        return true;
    }
};
