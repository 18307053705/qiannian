const { WORLD_BOSS } = require('./config');
const { getRoleGlobal } = require('../roleG/getRoleGlobal');

module.exports = {
    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @param {*} data boss dps  done
     * @returns 
     */
    updateWorldBoss: function (req, res, { dps, ...data }) {
        const { role_id } = getRoleGlobal(req, res);
        const { rank: ranks } = WORLD_BOSS;
        if (dps) {
            const { v } = ranks[role_id] || { v: 0 };
            ranks[role_id] = {
                v: v + dps,
                s: new Date() * 1
            }
        }
        WORLD_BOSS = {
            ...WORLD_BOSS,
            ...data
        }
    }
}