const { roleFn } = require('../../utils');
module.exports = {
    /**
     * 角色退出
     */
    roleExit: async (req, res) => {
        await roleFn.roleExit(req, res)
        res.send({
            code: 0,
            data: '角色退出成功'
        });
    }
};