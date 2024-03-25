const { ShenYuanG, GrandG, ActivityG } = require('@/global');
const { RealmTable } = require('@/table');
const { asyncGetRoleInfo } = require('@/utils/roleFn/asyncGetRoleInfo');
const { updataRoleInfo } = require('@/utils/roleFn/updataRoleInfo');
module.exports = {
    /**
     * 深渊
     * @param  req 
     * @param  res
     */
    shenYuan: async function (req, res) {
        // 获取我的信息
        const { role_id: iRoleId, role_integral: iIntegral } = RoleG.getRoleGlobal(req, res);
        const { currentDir } = GrandG.getDirGlobal(req, res);
        const { role_id } = currentDir;
        // 是否助战
        const isAssist = role_id && role_id !== iRoleId;
        // 是否助人过深渊
        if (isAssist) {
            // 更新助战目标玩家神装积分
            const { role_integral: tIntegral } = await asyncGetRoleInfo(req, res, { role_id });
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
        res.listText.push(`神装积分+${isAssist ? 1 : 2}`);
    },
    /**
     * 境界雷劫
     * @param  req 
     * @param  res
     */
    tianJie: function (req, res) {
        const { upper_limit } = RoleG.getRoleGlobal(req, res);
        const { leiJie = '1-0' } = upper_limit;
        const leiJieArr = leiJie.split('-');
        // 雷劫ID
        const leiJieId = Number(leiJieArr[0]);
        // 雷劫层数
        let leiJieNum = Number(leiJieArr[1]) + 1;
        let leiJieInfo = RealmTable.getLeiJie(leiJieId);
        if (leiJieInfo.max === leiJieNum) {
            leiJieInfo = RealmTable.getLeiJie(leiJieId + 1);
            leiJieNum = 0;
        }
        upper_limit.leiJie = `${leiJieInfo.id}-${leiJieNum}`
        RoleG.updataRoleGlobal(req, res, { upper_limit });
    },
    /**
     * 洞天福地
     * @param  req 
     * @param  res
     */
    dongTianFuDi: function (req, res) {
        const { upper_limit } = RoleG.getRoleGlobal(req, res);
        upper_limit.dongTian = (upper_limit.dongTian || 0) + 1;
        RoleG.updataRoleGlobal(req, res, { upper_limit });
    },
    /**
     * 彩灵洞
     * @param  req 
     * @param  res
     */
    caiLingDong: function (req, res, freak) {
        const { socialize_pool } = RoleG.getRoleGlobal(req, res);
        const { ranks } = socialize_pool;
        const { integral, name } = freak;
        if (ranks) {
            res.listText.push(`击杀${name},队伍积分+${integral}`);
            ActivityG.updateCaiLingDong(req, res, { integral });
        }
    },
};
