const { RealmTable, knapsackTable } = require('@/table');
module.exports = {
    /**
     * 获取境界
     * @param
     */
    getJingJie: function (req, res) {
        const { role_attr, role_realm } = RoleG.getRoleGlobal(req, res);
        const { qian_li, max_qian_li, potential } = role_attr;
        const realmMeun = RealmTable.getRealmMeun();
        let eles = 0;
        // 循环计算当前境界元素属性
        for (let key = 0; key <= role_realm; key++) {
            eles += realmMeun[key]?.ele || 0
        }

        // 获取下个境界
        const next = RealmTable.getRealm(role_realm + 1);
        if (next) {
            const { condition } = next;
            if (condition.leiJieId) {
                condition.leiJieId = RealmTable.getLeiJie(condition.leiJieId).name;
            }
            next.condition.article = condition.article.split(',').map((itme) => {
                const [id, s] = itme.split('-');
                return `${knapsackTable.getDataName(id)}x${s}`;
            }).join(',')
        }

        res.send({
            code: 0,
            data: {
                qian_li,
                max_qian_li,
                potential,
                eles,
                role_realm: RealmTable.getRealm(role_realm).name,
                next: next ? { name: next.name, condition: next.condition } : undefined,
                list: Object.values(realmMeun).map(realm => {
                    const { condition } = realm;
                    if(!condition){
                        return realm;
                    }
                    if (condition.leiJieId) {
                        condition.leiJieId = RealmTable.getLeiJie(condition.leiJieId).name;
                    }
                    realm.condition.article = condition.article.split(',').map((itme) => {
                        const [id, s] = itme.split('-');
                        return `${knapsackTable.getDataName(id)}x${s}`;
                    }).join(',')
                    return realm;
                })
            }
        })
    }
}

