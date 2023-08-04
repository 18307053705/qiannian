const { RoleG } = require('../../global');


module.exports = {
    /**
     * 直接增加玩家属性的物品
     * @param {*} req 
     * @param {key_value} group
     * @param {number} s 使用数量
     * @returns { string } message 错误信息,存在则使用失败
     * @returns { string } text 使用成功信息,存在则使用成功
     */
    group2Fn: function (req, res, group, s = 1) {
        const [key] = group.split('-');
        return this[key](req, res, group, s);
    },
    vipBuff: function (req, res, group, s) {
        const { role_buff } = RoleG.getRoleGlobal(req, res);
        const { vip } = role_buff;
        if (vip[group]) {
            vip[vipKey]['d'] += DateTitme * s
        } else {
            vip[vipKey] = { d: DateTitme * s + new Date() * 1 }
        }
        RoleG.updataRoleGlobal(req, res, { role_buff });
    },
    exp2: this.vipBuff,
    exp3: this.vipBuff,
    exp5: this.vipBuff,
    money2: this.vipBuff,
    money3: this.vipBuff,
    money5: this.vipBuff,
    // 战斗属性buff
    attrBuff: function (req, res, group, s) {
        const { role_buff } = RoleG.getRoleGlobal(req, res);
        let { attr } = role_buff;
        let add = true;
        attr = attr.map((itme) => {
            if (itme.e === group) {
                itme.d = itme.d + DateTitme * s;
                add = false;
            }
            return itme;
        })
        if (add) {
            attr.push(({
                e: group,
                d: DateTitme * s + new Date() * 1
            }))
        }
        RoleG.updataRoleGlobal(req, res, { role_buff });
    },
    atk: this.attrBuff,
    dfs: this.attrBuff,
    life_max: this.attrBuff,
    mana_max: this.attrBuff,
}

