const { CAI_LIN_DONG } = require('./config');
const { getRoleGlobal } = require('../roleG/getRoleGlobal');

module.exports = {
    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @param {*} data  dps  done
     * @returns 
     */
    updateCaiLingDong: function (req, res, { integral, ...data }) {
        const { socialize_pool } = getRoleGlobal(req, res);
        const { ranks } = socialize_pool;
        if (!ranks) {
            return;
        }
        const { rank } = CAI_LIN_DONG;
        if (integral) {
            const { v } = rank[ranks.id] || { v: 0 };
            ranks[ranks.id] = {
                v: v + integral,
                s: new Date() * 1
            }
        }
        CAI_LIN_DONG = {
            ...CAI_LIN_DONG,
            ...data
        }
    }
}