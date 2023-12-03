const roleFn = require("../roleFn");


module.exports = {
    /**
     * 获取角色所在坐标
     * @param {*} req 
     * @param {*} res 
     * @returns {*} Promise address 返回坐标
     */
    enterDir: async function (req, res) {
        const { address } = await roleFn.asyncGetRoleInfo(req, res);
        return address;
    },

};
