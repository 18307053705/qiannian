const { DAILYS_Global } = require('./config');

module.exports = {
    /**
     * 
     * @param {*} req 
     * @param {*} res
     * @returns dailys.dailyTask 每日任务 {taskType:次数}
     * @returns dailys.copyTask  副本任务{id：次数}
     * @returns dailys.fw 房屋免费操作次数10
     * @returns dailys.xz 勋章免费操作次数10
     * @returns dailys.hb 徽标免费操作次数10
     * @returns dailys.lp 令牌免费操作次数10
     * @returns dailys.day 首日登录抽奖次数
     * @returns dailys.zhanChang 战场{s:死亡次数,v:功勋值}
     * @returns dailys.shenYuan 深渊{s:进入次数,l:当前层数}}
     * @returns dailys.xiuLian 修炼房{s:进入次数,l:当前层数}}
     * @returns dailys.QingYuan 情缘信息 {j:浇水次数,c:除草}

     */
    getDailysGlobal: function (req, res, { roleId } = {}) {
        const { role_id } = roleId ? { role_id: roleId } :RoleG.getRoleGlobal(req, res);
        return DAILYS_Global[role_id] ? JSON.parse(JSON.stringify(DAILYS_Global[role_id])) : undefined;
    }
}