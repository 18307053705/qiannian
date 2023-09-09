const { RoleG } = require("../../global");

module.exports = {
    /**
     * 删除情缘
     * @param {*} req 
     * @param {*} res 
     */
    deleteQingyuan: async function (req, res) {
        const { qingyuan } = RoleG.getRoleGlobal(req, res);
        const { d } = qingyuan;
        const { results } = await res.asyncQuery(`delete from qingyuan  where id="${d.id}"`);
        return results[0];
    }
}