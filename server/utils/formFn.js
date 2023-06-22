module.exports = {
    checkName: function (name, res) {
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
