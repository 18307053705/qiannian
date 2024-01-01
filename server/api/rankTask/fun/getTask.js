const {  rankTaskG } = require('@/global');
module.exports = {
    /**
  * 领取任务
  * @param {*} req 
  * @param {*} res 
  * @param {*} task 
  */
    getTask: function (req, res, task) {
        if (task.fun === 'gang1') {
            const { socialize_pool } = RoleG.getRoleGlobal(req, res);
            const { level } = socialize_pool;
            if (level < 5) {
                return '帮会等级不足,领取失败！'
            }
        }
        task.status = 1;
        rankTaskG.updataRankTask(req, res, task);
    }

}