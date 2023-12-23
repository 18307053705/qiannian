

const { RANK_TASK_Global, RANK_TASK_TYPE } = require('./config');

module.exports = {
    updataRankTask: function (req, res, task) {
        const data = JSON.parse(JSON.stringify(task));
        const { type, id: taskId } = data;
        const { qingyuan, socialize_pool } = RoleG.getRoleGlobal(req, res);
        if (type === RANK_TASK_TYPE.qingyuan) {
            const { id } = qingyuan.d;
            RANK_TASK_Global[RANK_TASK_TYPE.qingyuan][id][taskId] = data;
        }
        if (type === RANK_TASK_TYPE.xiulianfang) {
            const { id } = socialize_pool.gang;
            RANK_TASK_Global[RANK_TASK_TYPE.xiulianfang][id][taskId] = data;
        }
    }
}