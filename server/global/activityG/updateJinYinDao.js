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
            const { id, name } = gang;
            const { v } = rank[id] || { v: 0 };
            JIN_YIN_DAO.rank[id] = {
                v: v + integral,
                s: new Date() * 1,
                n: name,
                id
            }
        }
        Object.keys(data).forEach((key) => {
            JIN_YIN_DAO[key] = data[key]
        })
    }
}