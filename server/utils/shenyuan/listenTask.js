const { ShenYuanG, RoleG, GrandG } = require('../../global');
const { getRoleInfo } = require('../roleFn/asyncGetRoleInfo');
const { updataRoleInfo } = require('../roleFn//updataRoleInfo');
module.exports = {
    /**
     * 监听任务击杀进度
     * @param {*} req 
     * @param {*} res 
     * @param {*} freakId 怪物id
     */
    listenTask: async function (req, res, freakId) {
        if (freakId !== ShenYuanG.SHNEYUAN_FREAK_ID) {
            return;
        }
        // 获取我的信息
        const { role_id: iRoleId, role_integral: iIntegral } = RoleG.getRoleGlobal(req, res);
        const { currentDir } = GrandG.getDirGlobal(req, res);
        const { shenyuan } = currentDir;
        const { role_id } = shenyuan;
        // 是否助战
        const isAssist = role_id && role_id !== iRoleId;
        // 是否助人过深渊
        if (isAssist) {
            // 更新助战目标玩家神装积分
            const { role_integral: tIntegral } = await getRoleInfo(req, res, { role_id });
            tIntegral['shenZhuang'] = (tIntegral['shenZhuang'] || 0) + 2;
            updataRoleInfo(req, res, { role_integral: tIntegral }, role_id);
            // 更新助战目标深渊层数
            const { l } = ShenYuanG.getShenYuan(req, res, role_id);
            ShenYuanG.updateShenYuan(req, res, { l: l + 1 }, role_id);
        }
        // 更新自身积分,助战只获得一半积分
        iIntegral['shenZhuang'] = (iIntegral['shenZhuang'] || 0) + (isAssist ? 1 : 2);
        RoleG.updataRoleGlobal(req, res, { role_integral: iIntegral });
        // 更新自身深渊信息

        if (!isAssist) {
            const { l } = ShenYuanG.getShenYuan(req, res);
            ShenYuanG.updateShenYuan(req, res, { l: l + 1 });
        }

    }
}