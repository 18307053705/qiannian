const { JIN_YIN_DAO } = require('./config');
const { getRoleGlobal } = require('../roleG/getRoleGlobal');

module.exports = {
    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @param {*} data  dps  done
     * @returns 
     */
    updateJinYinDao: function (req, res, { integral, ...data }) {
        const { socialize_pool } = getRoleGlobal(req, res);
        const { gang } = socialize_pool;
        if (!gang) {
            return;
        }
        const { rank } = JIN_YIN_DAO;
        if (integral) {
            const { v } = rank[gang.id] || { v: 0 };
            gang[gang.id] = {
                v: v + integral,
                s: new Date() * 1
            }
        }
        JIN_YIN_DAO = {
            ...JIN_YIN_DAO,
            ...data
        }
    }
}