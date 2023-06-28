const Global = require('../global')
// 两小时时间戳
const DateTitme = 1000 * 60 * 120;
module.exports = {
    /**
     * 
     * @param {*} req 
     * @param {key_value} group
     */
    groupFn: function (req, group, s = 1) {
        const [key] = group.split('-');
        if (!this[key]) {
            return { message: '特效异常' }
        }
        return this[key](req, group, s) || {};
    },

    vipBuff: function (req, group, s) {
        const { role_buff } = Global.getRoleGlobal(req);
        let { vip } = role_buff;
        if (vip[group]) {
            vip[vipKey]['d'] += DateTitme * s
        } else {
            vip[vipKey] = { d: DateTitme * s + new Date() * 1 }
        }
        Global.updateRoleGlobal(req, { role_buff });
    },
    exp2: this.vipBuff,
    exp3: this.vipBuff,
    exp5: this.vipBuff,
    money2: this.vipBuff,
    money3: this.vipBuff,
    money5: this.vipBuff,
    // 战斗属性buff
    attrBuff: function (req, group, s) {
        const { role_buff } = Global.getRoleGlobal(req);
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
        Global.updateRoleGlobal(req, { role_buff });
    },
    atk: this.attrBuff,
    dfs: this.attrBuff,
    life_max: this.attrBuff,
    mana_max: this.attrBuff,
}

