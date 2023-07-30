const { RoleG } = require("../../global");
module.exports = {
    /**
     * 获取坐标内所有玩家
     * @param {*} req 
     * @param {*} res 
     * @param {*} address 坐标 
     * @returns {*} roleInfo[]|undefined
     * 
     */
    getAddressPlayers: async function (req, res, address) {
        const { role_id } = await RoleG.getRoleGlobal(req, res);
        const { results } = await res.asyncQuery(`select * from role  where address="${address}" and role_id<>"${role_id}"`);
        return results;
    }
};
