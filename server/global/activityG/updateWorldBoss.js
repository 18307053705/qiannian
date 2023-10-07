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
        const { role_id, role_name } = getRoleGlobal(req, res);
        const { rank } = WORLD_BOSS;
        if (dps) {
            const { v } = rank[role_id] || { v: 0 };
            rank[role_id] = {
                v: v + dps,
                s: new Date() * 1,
                n: role_name,
                id:role_id
            }
        }
        Object.keys(data).forEach((key) => {
            WORLD_BOSS[key] = data[key]
        })
    }
}