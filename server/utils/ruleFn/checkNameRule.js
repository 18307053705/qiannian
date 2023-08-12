module.exports = {
    /**
     * 验证名字是否合法
     * @param {*} res 
     * @param {*} name 
     * @returns false不合格
     */
    checkNameRule: function (res, name) {
        const reg = /^((?!\\|\/|:|\*|\?|<|>|'|%).){2,8}$/;
        if (reg.test(name)) {
            return true;
        }
        res.send({
            code: 0,
            message: '规则:不可存在特殊字符,且为2-8个字符'
        });
        return false;
    }
};
