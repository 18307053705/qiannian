const { ShenYuanG, GrandG } = require('@/global');
const { RealmTable, ElementTable } = require('@/table');
const { TE_SHU_FREAK_ID_MAP } = ElementTable;
module.exports = {
    /**
     * @param tianJieId 天劫战斗
     */
    tianJieFight: function (req, res) {
        const { role_level, upper_limit, role_realm } = RoleG.getRoleGlobal(req, res);
        const { leiJie = '1-0' } = upper_limit;
        const leiJieArr = leiJie.split('-');
        // 雷劫ID
        const leiJieId = Number(leiJieArr[0]);
        // 雷劫层数
        let leiJieNum = Number(leiJieArr[1]);
        let leiJieInfo = RealmTable.getLeiJie(leiJieId);
        if (leiJieInfo.max === leiJieNum) {
            leiJieInfo = RealmTable.getLeiJie(leiJieId + 1);
            leiJieNum = 0;
        }
        const { max, name, level, realm } = leiJieInfo;
        if (level > role_level) {
            res.send({
                code: 0,
                message: '等级不足，渡劫失败！'
            })
            return;
        }

        // if (realm > role_realm) {
        //     res.send({
        //         code: 0,
        //         message: '境界不足，渡劫失败！'
        //     })
        //     return;
        // }
        const currentDir = {
            id: TE_SHU_FREAK_ID_MAP.LEIJIE_FREAK_ID,
            name,
            type: 2,
            num: 1,
            grade: 3,
            career: 1,
            level,
            // 每五层加1倍属性
            attr: 5 + (leiJieNum * 0.5),
            exp: 1000000,
            tael: 50000,
            customCallback: 'tianJie',
            customFreak: true,
        }
        GrandG.setCurrentDir(req, res, currentDir);
        res.send({
            code: 0,
            path: '/fight'
        })
    }
}