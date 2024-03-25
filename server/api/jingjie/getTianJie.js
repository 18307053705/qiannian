const { RealmTable } = require('@/table');
module.exports = {
    /**
     * @param tianJieId 获取天劫信息
     */
    getTianJie: function (req, res) {
        const { upper_limit } = RoleG.getRoleGlobal(req, res);
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
        if (leiJieInfo.last) {
            const { realm, name, max, level } = RealmTable.getLeiJie(leiJieInfo.id);
            res.send({
                code: 0,
                data: {
                    last: true,
                    name,
                    max,
                    level,
                    num: leiJieNum,
                    realm: RealmTable.getRealm(realm).name
                }
            })
            return;
        }
        const { realm, name, max, level } = leiJieInfo;
        res.send({
            code: 0,
            data: {
                name,
                max,
                level,
                num: leiJieNum,
                realm: RealmTable.getRealm(realm).name
            }
        })
    }
}