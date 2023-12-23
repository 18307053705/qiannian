const { CAI_LIN_DONG } = require('./config');

module.exports = {
    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @param {*} data  dps  done
     * @returns 
     */
    updateCaiLingDong: function (req, res, { integral, ...data }) {
        const { socialize_pool } = RoleG.getRoleGlobal(req, res);
        const { ranks } = socialize_pool;
        if (!ranks) {
            return;
        }
        const { rank } = CAI_LIN_DONG;
        if (integral) {
            const { id, name } = ranks;
            const { v } = rank[id] || { v: 0 };
            CAI_LIN_DONG.rank[id] = {
                v: v + integral,
                s: new Date() * 1,
                n: name,
                id
            }
        }
        Object.keys(data).forEach((key) => {
            CAI_LIN_DONG[key] = data[key]
        })
    }
}