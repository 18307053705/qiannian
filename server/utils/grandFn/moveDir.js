const { RoleG } = require("../../global");
const MOVE_MAP = {
    l: "l",
    u: "u",
    r: "r",
    d: "d"
};

module.exports = {
    MOVE_MAP,
    /**
     * 角色移动
     * @param {*} req 
     * @param {*} res
     * @param {*} dir 地图指令
     * @returns {*} address 返回坐标
     */
    moveDir: function (req, res, dir) {
        const { address } = RoleG.getRoleGlobal(req, res);
        if (address) {
            const [id, strX, strY] = address.split(",");
            let x = Number(strX);
            let y = Number(strY);
            switch (dir) {
                case MOVE_MAP.u:
                    x++;
                    break;
                case MOVE_MAP.r:
                    y++;
                    break;
                case MOVE_MAP.d:
                    x--;
                    break;
                case MOVE_MAP.l:
                    y--;
                    break;
            }
            const upAddress = `${id},${x},${y}`;
            RoleG.updataRoleGlobal(req, res, { address: upAddress });
            return upAddress;
        }
    },

};
