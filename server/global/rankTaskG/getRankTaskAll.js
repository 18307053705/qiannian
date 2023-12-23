

const { RANK_TASK_Global, RANK_TASK_TYPE } = require('./config');

module.exports = {
    /**
    * @param {*} req 
    * @param {*} res 
    * @return {qingyuan,xiulianfang}
    */
    getRankTaskAll: function (req, res) {
        const { qingyuan, socialize_pool } = RoleG.getRoleGlobal(req, res);
        const { id: qyID } = qingyuan.d;
        const { id: gangID } = socialize_pool.gang || {};
        return {
            [RANK_TASK_TYPE.qingyuan]: RANK_TASK_Global[RANK_TASK_TYPE.qingyuan][qyID],
            [RANK_TASK_TYPE.xiulianfang]: RANK_TASK_Global[RANK_TASK_TYPE.xiulianfang][gangID],
        }

    }
}