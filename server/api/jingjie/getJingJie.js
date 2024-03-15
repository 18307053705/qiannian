const { RealmTable } = require('@/table');
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
            eles = realmMeun[key]?.ele || 0
        }
        res.send({
            code: 0,
            data: {
                qian_li,
                max_qian_li,
                potential,
                eles,
                role_realm: RealmTable.getRealm(role_realm).name,
                next:RealmTable.getRealm(role_realm + 1),
            }
        })
    }
}

