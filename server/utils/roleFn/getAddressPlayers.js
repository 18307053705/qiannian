const { ROLE_Global } = require("../../global/roleG/config");
const { getRoleGlobal } = require("../../global/roleG/getRoleGlobal");
module.exports = {
    /**
     * 获取坐标内所有玩家
     * @param {*} req 
     * @param {*} res 
     * @param {*} address 坐标 
     * @returns {*} roleInfo[]|[]
     * 
     */
    getAddressPlayers: async function (req, res, oldAddress) {
        const { role_id: id } = getRoleGlobal(req, res);
        return Object.values(ROLE_Global).filter(({ role_id, address }) => role_id !== id && address === oldAddress);
    }
};
