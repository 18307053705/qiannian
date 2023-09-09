const { DAILYS_Global } = require('./config');
const { getRoleGlobal } = require('../roleG/getRoleGlobal');

module.exports = {
    /**
     * 
     * @param {*} req 
     * @param {*} res
     * @returns dailys.exp 经验任务可领取次数
     * @returns dailys.tael 金钱任务可领取次数
     * @returns dailys.world 世界声望任务可领取次数
     * @returns dailys.exploit 每日功勋可领取次数
     * @returns dailys.gang  每日帮会任务可领取次数
     * @returns dailys.intersect 每日结义任务可领取次数
     * @returns dailys.fw 房屋免费操作次数10
     * @returns dailys.xz 勋章免费操作次数10
     * @returns dailys.hb 徽标免费操作次数10
     * @returns dailys.lp 令牌免费操作次数10
     * @returns dailys.shenYuan 深渊{s:进入次数,l:当前层数}}
     * @returns dailys.xiuLian 修炼房{s:进入次数,l:当前层数}}
     * @returns dailys.QingYuan 情缘信息 {j:浇水次数,c:除草}
     * @returns dailys.lianHunDong 30级炼魂洞副本
     * @returns dailys.heiJiaoYu 40级黑角域副本
     * @returns dailys.siHailongGong 50级四海龙宫副本
     * @returns dailys.fengHuangTongMu 60级凤凰桐木副本
     * @returns dailys.moShenChuanShuo 70级魔神传说副本
     * @returns dailys.haiDiMoGong 80级海底魔宫副本
     * @returns dailys.tinaMoYiZhi 90级天魔遗址副本
     * @returns dailys.diFuChuanShuo 100级地府传说副本
     * @returns dailys.qunMoLuanWu 100级群魔乱舞副本
     * @returns dailys.tianMoJIangLin 100级天魔降临副本
     */
    getDailysGlobal: function (req, res) {
        const { role_id } = getRoleGlobal(req, res);
        return DAILYS_Global[role_id] ? JSON.parse(JSON.stringify(DAILYS_Global[role_id])) : undefined;
    }
}